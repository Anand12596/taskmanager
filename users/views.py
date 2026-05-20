from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from .models import User
from .serializers import UserSerializer


class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [AllowAny]


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [AllowAny]