from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Field, FieldUpdate
from .serializers import FieldSerializer, FieldUpdateSerializer
from django.shortcuts import get_object_or_404

class FieldListCreateView(generics.ListCreateAPIView):
    serializer_class = FieldSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Field.objects.select_related('assigned_agent').prefetch_related('updates').all()
        return Field.objects.select_related('assigned_agent').prefetch_related('updates').filter(assigned_agent=user)

    def perform_create(self, serializer):
        if self.request.user.role != 'admin':
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only admins can create fields.")
        serializer.save()

class FieldDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FieldSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Field.objects.select_related('assigned_agent').prefetch_related('updates').all()
        return Field.objects.select_related('assigned_agent').prefetch_related('updates').filter(assigned_agent=user)

    def perform_update(self, serializer):
        if self.request.user.role != 'admin':
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only admins can fully update fields, use updates API instead.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user.role != 'admin':
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only admins can delete fields.")
        instance.delete()

class FieldUpdateListCreateView(generics.ListCreateAPIView):
    serializer_class = FieldUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        field_id = self.kwargs['field_id']
        return FieldUpdate.objects.select_related('updated_by', 'field').filter(field_id=field_id).order_by('-date')

    def perform_create(self, serializer):
        field_id = self.kwargs['field_id']
        field = get_object_or_404(Field, id=field_id)
        
        user = self.request.user
        if user.role == 'agent' and field.assigned_agent != user:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You can only update your assigned fields.")
            
        update_obj = serializer.save(field=field, updated_by=user)
        # Update current stage of the field
        field.current_stage = update_obj.stage
        field.save()
