from rest_framework import serializers
from feed.models import User


class UserSerializer(serializers.ModelSerializer):
    
    """meta class is used to define the model and fields to be serialized."""
    
    class Meta:
        model = User
        fields = [
            "uuid",
            "username",
            "email",
            "first_name",
            "last_name",
        ]
        read_only_fields = [
            "date_joined",
            "created_at",
            "modified_at",
            "is_deleted",
            "deleted_at",
        ]
