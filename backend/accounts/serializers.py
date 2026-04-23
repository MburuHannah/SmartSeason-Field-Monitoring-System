from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source='full_name', required=False, allow_blank=True)
    isFirstLogin = serializers.BooleanField(source='first_login', read_only=True)
    createdDate = serializers.DateTimeField(source='date_joined', read_only=True, format='%Y-%m-%d')
    hasAssignedField = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'fullName', 'email', 'phone', 'unit', 'isFirstLogin', 'createdDate', 'hasAssignedField']

    def get_hasAssignedField(self, obj):
        return obj.assigned_fields.exists()

class AgentCreateSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source='full_name', required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'fullName', 'email', 'phone', 'unit']

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            phone=validated_data.get('phone', ''),
            unit=validated_data.get('unit', ''),
            full_name=validated_data.get('full_name', ''),
            role='agent',
            first_login=True
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class AgentUpdateSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source='full_name', required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = ['fullName', 'email', 'phone', 'unit']

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
