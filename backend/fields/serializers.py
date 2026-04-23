from rest_framework import serializers
from .models import Field, FieldUpdate

class FieldUpdateSerializer(serializers.ModelSerializer):
    updatedBy = serializers.CharField(source='updated_by.full_name', read_only=True)
    fieldId = serializers.CharField(source='field.id', read_only=True)
    fieldName = serializers.CharField(source='field.name', read_only=True)
    
    class Meta:
        model = FieldUpdate
        fields = ['id', 'fieldId', 'fieldName', 'date', 'stage', 'notes', 'updatedBy']

class FieldSerializer(serializers.ModelSerializer):
    assignedAgentId = serializers.CharField(source='assigned_agent.id', read_only=True)
    assigned_agent_id = serializers.IntegerField(write_only=True, required=False)
    agentName = serializers.CharField(source='assigned_agent.full_name', read_only=True)
    cropType = serializers.CharField(source='crop_type')
    plantingDate = serializers.DateField(source='planting_date')
    currentStage = serializers.CharField(source='current_stage', read_only=True)
    status = serializers.SerializerMethodField()
    
    class Meta:
        model = Field
        fields = ['id', 'name', 'cropType', 'plantingDate', 'currentStage', 'status', 'assignedAgentId', 'assigned_agent_id', 'agentName', 'location', 'area']
    
    def get_status(self, obj):
        if obj.current_stage == 'Harvested':
            return 'completed'
            
        if hasattr(obj, '_prefetched_objects_cache') and 'updates' in obj._prefetched_objects_cache:
            updates = list(obj.updates.all())
            updates.sort(key=lambda u: u.date, reverse=True)
        else:
            updates = list(obj.updates.all().order_by('-date'))
            
        if not updates:
            return 'at-risk'
            
        recent_update = updates[0]
        
        import re
        risk_keywords = ["pest", "disease", "dry", "poor growth", "low yield", "drought", "infected", "dying"]
        pattern = re.compile(r'\b(' + '|'.join(risk_keywords) + r')\b', re.IGNORECASE)
        
        for u in updates[:5]:
            if pattern.search(u.notes):
                return 'at-risk'
                
        from django.utils import timezone
        days_since = (timezone.now() - recent_update.date).days
        if days_since > 14:
            return 'at-risk'
            
        return 'active'
    
    def create(self, validated_data):
        agent_id = validated_data.pop('assigned_agent_id', None)
        field = Field.objects.create(**validated_data)
        if agent_id:
            field.assigned_agent_id = agent_id
            field.save()
        return field
        
    def update(self, instance, validated_data):
        agent_id = validated_data.pop('assigned_agent_id', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if agent_id is not None:
            instance.assigned_agent_id = agent_id
        instance.save()
        return instance
