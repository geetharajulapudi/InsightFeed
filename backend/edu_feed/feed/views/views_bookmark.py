from django.shortcuts import render
from rest_framework import viewsets, permissions
from feed.serializers.serializers_bookmark import BookmarkSerializer
from feed.models import Bookmark, User

# Create your views here.
class BookmarkViewSet(viewsets.ModelViewSet):

    serializer_class = BookmarkSerializer

    def get_queryset(self):
        """
        Return bookmarks for the logged-in user that are not soft-deleted.
        """
        user_uuid = self.kwargs["user_uuid"]
        return Bookmark.objects.filter(
            user__uuid=user_uuid,
            is_deleted=False,
        ).order_by("-created_at")

    def perform_create(self, serializer):
        """
        Automatically assign the bookmark to the logged-in user.
        """
        user_uuid = self.kwargs["user_uuid"]
        user = User.objects.get(uuid=user_uuid)
        serializer.save(user=user)

    def perform_destroy(self, instance):
        """
        Perform a soft delete using the built-in soft_delete method.
        """
        instance.soft_delete()
