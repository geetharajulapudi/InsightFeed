from rest_framework import viewsets, permissions
from feed.serializers.serializers_notes import NoteSerializer
from feed.models import Note, User, Bookmark
from rest_framework.exceptions import ValidationError

class NoteViewSet(viewsets.ModelViewSet):
    """
    ViewSet to handle creation, listing, and deletion of notes.
    Automatically attaches the note to a bookmark (creating it if needed).
    """

    serializer_class = NoteSerializer

    def get_queryset(self):
        """
        Return notes only for the specified user.
        """
        if getattr(self, "swagger_fake_view", False):
            return Note.objects.none()

        user_uuid = self.kwargs["user_uuid"]
        return Note.objects.filter(uuid=user_uuid, is_deleted=False)

    def perform_create(self, serializer):
        """
        Attach the note to the correct user and bookmark.
        If no bookmark exists, create it.
        Only one note per bookmark is allowed.
        """
        user_uuid = self.kwargs["user_uuid"]
        user = User.objects.get(uuid=user_uuid)

        url = self.request.data.get("url")
        if not url:
            raise ValidationError(
                {"url": "This field is required to identify the article."}
            )

        # Find existing bookmark
        bookmark = Bookmark.objects.filter(
            user=user, url=url, is_deleted=False
        ).first()

        if not bookmark:
            # Create new bookmark from article data
            bookmark = Bookmark.objects.create(
                user=user,
                article_id=self.request.data.get("article_id"),
                article_title =self.request.data.get("article_title"),
                description=self.request.data.get("description"),
                url=url,
                cover_image=self.request.data.get("cover_image"),
                tags=self.request.data.get("tags"),
                published_at=self.request.data.get("published_at"),
                has_note=True,
            )
        else:
            # Prevent duplicate note
            if bookmark.notes.exists():
                raise ValidationError(
                    {
                        "detail": "A note already exists for this article. You can only create one note per bookmark."
                    }
                )
            if not bookmark.has_note:
                bookmark.has_note = True
                bookmark.save(update_fields=["has_note"])

        # Create the note
        serializer.save(user=user, bookmark=bookmark)

    def perform_destroy(self, instance):
        """
        Soft delete the note. Update the bookmark's has_note.
        """
        instance.soft_delete()

        if instance.bookmark:
            instance.bookmark.has_note = False
            instance.bookmark.save(update_fields=["has_note"])

