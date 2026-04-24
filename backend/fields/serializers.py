import re
from rest_framework import serializers
from django.utils import timezone
from .models import Field, FieldUpdate

RISK_KEYWORDS = [
    "pest",
    "disease",
    "dry",
    "low yield",
    "drought",
    "infected",
    "dying",
    "wilting",
]
RISK_PHRASES = ["poor growth"]
RISK_PATTERN = re.compile(r"\b(" + "|".join(RISK_KEYWORDS) + r")\b", re.IGNORECASE)


class FieldUpdateSerializer(serializers.ModelSerializer):
    updatedBy = serializers.CharField(source="updated_by.full_name", read_only=True)
    fieldId = serializers.CharField(source="field.id", read_only=True)
    fieldName = serializers.CharField(source="field.name", read_only=True)

    class Meta:
        model = FieldUpdate
        fields = ["id", "fieldId", "fieldName", "date", "stage", "notes", "updatedBy"]


class FieldSerializer(serializers.ModelSerializer):
    assignedAgentId = serializers.CharField(source="assigned_agent.id", read_only=True)
    assigned_agent_id = serializers.IntegerField(write_only=True, required=False)
    agentName = serializers.CharField(source="assigned_agent.full_name", read_only=True)
    cropType = serializers.CharField(source="crop_type")
    plantingDate = serializers.DateField(source="planting_date")
    currentStage = serializers.CharField(source="current_stage", read_only=True)
    status = serializers.SerializerMethodField()

    class Meta:
        model = Field
        fields = [
            "id",
            "name",
            "cropType",
            "plantingDate",
            "currentStage",
            "status",
            "assignedAgentId",
            "assigned_agent_id",
            "agentName",
            "location",
            "area",
        ]

    def get_status(self, obj):
        if obj.current_stage == "Harvested":
            return "completed"

        if (
            hasattr(obj, "_prefetched_objects_cache")
            and "updates" in obj._prefetched_objects_cache
        ):
            updates = sorted(obj.updates.all(), key=lambda u: u.date, reverse=True)
        else:
            updates = list(obj.updates.all().order_by("-date"))

        if not updates:
            return "at-risk"

        recent_update = updates[0]
        notes = recent_update.notes or ""

        # Bug 1 fix: only check the single most recent update
        # Bug 2 fix: added "wilting"; phrase-match "poor growth" separately
        if RISK_PATTERN.search(notes):
            return "at-risk"

        if any(phrase in notes.lower() for phrase in RISK_PHRASES):
            return "at-risk"

        days_since = (timezone.now() - recent_update.date).days
        if days_since > 14:
            return "at-risk"

        return "active"

    def create(self, validated_data):
        agent_id = validated_data.pop("assigned_agent_id", None)
        field = Field.objects.create(**validated_data)
        if agent_id:
            field.assigned_agent_id = agent_id
            field.save()
        return field

    def update(self, instance, validated_data):
        agent_id = validated_data.pop("assigned_agent_id", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if agent_id is not None:
            instance.assigned_agent_id = agent_id
        instance.save()
        return instance
