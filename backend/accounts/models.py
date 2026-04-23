from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('agent', 'Agent'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='agent')
    first_login = models.BooleanField(default=True)
    phone = models.CharField(max_length=20, blank=True)
    unit = models.CharField(max_length=100, blank=True)
    full_name = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return self.username
