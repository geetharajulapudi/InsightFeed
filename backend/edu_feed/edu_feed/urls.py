"""
URL configuration for edu_feed project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from feed.views.views_user import UserViewSet
from feed.views.views_bookmark import BookmarkViewSet
from feed.views.views_getArticles import ExternalArticlesView

router = DefaultRouter()

router.register(r'user', UserViewSet, basename='user')
router.register(r'user/(?P<user_uuid>[^/.]+)/bookmark', BookmarkViewSet, basename='bookmark')
# router.register(r'user/(?P<user_uuid>[^/.]+)/notes', NoteViewSet, basename='note')

urlpatterns = [
    path('api/articles/', ExternalArticlesView.as_view(), name='article-detail'),
    path('', include(router.urls))
]