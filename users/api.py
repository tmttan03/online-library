from django.contrib.auth import logout

from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet

from .serializers import (
    AuthenticationSerializer,
    UserSerializer,
    RegistrationSerializer,
)

# set an alias to resolve conflict with User endpoint
from .models import User as UserModel
from utils.mixins import get_object_or_None


#/api/users/login/
class Login(APIView):
    """ user authentication endpoint """

    authentication_classes = ()
    permission_classes = (AllowAny,)
    serializer_class = AuthenticationSerializer

    def post(self, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data, request=self.request)
        serializer.is_valid(raise_exception=True)
        return Response({
            'user_id': serializer.user.id,
            'token': serializer.get_token().key
        }, status=200)


#/api/users/logout/
class Logout(APIView):
    """ user logout endpoint """

    permission_classes = (IsAuthenticated,)

    def post(self, *args, **kwargs):
        logout(self.request)
        return Response(status=204)


#/api/users/register/
class Register(APIView):
    """ user register endpoint """

    authentication_classes = ()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    def post(self, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(status=200)
        return Response(serializer.errors, status=400)


#/api/users/
class Users(ViewSet):
    """ users endpoint """

    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def get(self, *args, **kwargs):
        users = UserModel.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data, status=200)


#/api/users/<int:id>/
class User(ViewSet):
    """ user endpoint """

    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    parser_class = (MultiPartParser,)

    def get(self, *args, **kwargs):
        serializer = self.serializer_class(instance=self.request.user)
        return Response(serializer.data, status=200)

    def get_by_id(self, *args, **kwargs):
        user = get_object_or_None(UserModel, id=self.kwargs.get('id'))
        if user:
            serializer = self.serializer_class(instance=user)
            return Response(serializer.data, status=200)
        return Response(status=400)

    def update(self, *args, **kwargs):
        serializer = self.serializer_class(
            data=self.request.data,
            instance=self.request.user
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)




