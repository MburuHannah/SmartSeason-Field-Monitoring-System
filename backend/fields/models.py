from django.db import models
from django.conf import settings

class Field(models.Model):
    STAGE_CHOICES = (
        ('Planted', 'Planted'),
        ('Growing', 'Growing'),
        ('Ready', 'Ready'),
        ('Harvested', 'Harvested'),
    )
    
    name = models.CharField(max_length=255)
    crop_type = models.CharField(max_length=255)
    planting_date = models.DateField()
    current_stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='Planted')
    assigned_agent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='assigned_fields')
    location = models.CharField(max_length=255, blank=True)
    area = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return self.name

class FieldUpdate(models.Model):
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name='updates')
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(auto_now_add=True)
    stage = models.CharField(max_length=20, choices=Field.STAGE_CHOICES)
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"Update for {self.field.name} at {self.date}"
