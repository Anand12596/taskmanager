from django.urls import path

from .views import UserViewSet

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [

    path(
        'register/',
        UserViewSet.as_view({
            'post': 'create',
            'get': 'list'
        })
    ),

    path(
        'login/',
        TokenObtainPairView.as_view()
    ),
]