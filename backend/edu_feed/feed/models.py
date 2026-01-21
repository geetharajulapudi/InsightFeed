from django.db import models
from uuid import uuid4
from django.utils import timezone

# Create your models here.

class Base(models.Model):
    """
    Abstract base model with UUID primary key, timestamps,
    and soft-delete functionality.
    """
    uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    """mark the object as deleted without removing it from the database
    and setting the deleted_at timestamp"""

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    class Meta:
        abstract = True

"""
    Base model inherited by User, Bookmark, and Note models
"""
class User(Base):

    username = models.CharField(max_length=255)
    email = models.EmailField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    date_joined = models.DateTimeField(default=timezone.now)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)


    """return user's uuid as string representation"""
    def __str__(self): 
        return f"{self.uuid}"
    

class Bookmark(Base):
    """
    store bookmarks associated with users
    on_delete cascade to remove bookmarks when user is deleted
    related_name is to access reverse relationship from User to Bookmark

    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookmark")

    article_id = models.CharField(max_length=255)
    article_title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    weburl = models.URLField(blank=True, null=True)
    article_image = models.URLField(blank=True, null=True)

    trailtext = models.CharField(max_length=255)
    published_at = models.DateTimeField(blank=True, null=True)
    sectionname = models.CharField(max_length=255, blank=True, null=True)
    has_note = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.article_title} ({self.user})"
    

