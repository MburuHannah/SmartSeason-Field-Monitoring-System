from rest_framework import views, permissions
from rest_framework.response import Response
from fields.models import Field, FieldUpdate
from fields.serializers import FieldUpdateSerializer, FieldSerializer

class DashboardStatsView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'admin':
            fields = Field.objects.prefetch_related('updates').all()
            updates = FieldUpdate.objects.select_related('updated_by', 'field').all().order_by('-date')[:5]
        else:
            fields = Field.objects.prefetch_related('updates').filter(assigned_agent=user)
            updates = FieldUpdate.objects.select_related('updated_by', 'field').filter(field__assigned_agent=user).order_by('-date')[:5]

        # Use the serializer to compute everything easily
        serialized_fields = FieldSerializer(fields, many=True).data
        total = len(serialized_fields)
        
        completed = sum(1 for f in serialized_fields if f['status'] == 'completed')
        at_risk = sum(1 for f in serialized_fields if f['status'] == 'at-risk')
        active = sum(1 for f in serialized_fields if f['status'] == 'active')

        return Response({
            'totalFields': total,
            'activeFields': active,
            'atRiskFields': at_risk,
            'completedFields': completed,
            'recentUpdates': FieldUpdateSerializer(updates, many=True).data
        })
