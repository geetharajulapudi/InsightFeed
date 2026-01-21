from rest_framework import serializers
from feed.models import Bookmark, User

"""ModelSerializers helps default implementations for create() and update() methods."""

class BookmarkSerializer(serializers.ModelSerializer):

    """Meta class to define model and fields to be serialized."""
    class Meta:
        model = Bookmark
        fields = [
            "uuid",
            "article_id",
            "article_title",
            "weburl",
            "article_image",
            "description",
            "sectionname",
            # "published_at",
            "has_note",
        ]
        extra_kwargs = {"user": {"read_only": True}}

    """Validate bookmark uniqueness."""
    def validate(self, data):
        request = self.context.get("request")
        user_uuid = (
            request.parser_context["kwargs"].get("uuid")
            if request
            else None
        )
        article_id = data.get("article_id")

        """Check if the bookmark already exists for the user with the article_id"""
        if user_uuid and article_id:
            try:
                user = User.objects.get(uuid=user_uuid)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid user.")

            """Check for existing bookmark with the article_id for the user"""
            if Bookmark.objects.filter(
                user=user, article_id=article_id, is_deleted=False
            ).exists():
                raise serializers.ValidationError(
                    "This article is already bookmarked."
                )

        return data
