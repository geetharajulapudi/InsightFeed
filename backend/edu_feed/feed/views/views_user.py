from rest_framework.viewsets import ModelViewSet
from feed.models import User
from feed.serializers.serializers_user import UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone

class UserViewSet(ModelViewSet):

    queryset = User.objects.filter(
        is_deleted=False
    )  # Exclude soft-deleted users
    serializer_class = UserSerializer

    def get_queryset(self):
        """Filter the queryset based on query parameters."""
        valid_params = ["user_uuid"]
        query_params = {
            key: value
            for key, value in self.request.query_params.items()
            if (key in valid_params)
        }
        return self.queryset.filter(**query_params)

    def perform_update(self, serializer):

        """Update the modified_at field on update."""
        serializer.save(modified_at=timezone.now())

    def perform_destroy(self, instance):
        
        """Soft delete the user instead of actually deleting it."""
        instance.is_deleted = True
        instance.deleted_at = timezone.now()
        instance.save()