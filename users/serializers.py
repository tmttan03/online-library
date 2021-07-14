import datetime

from django.conf import settings
from django.contrib.auth import authenticate, login
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

from .models import User


class AuthenticationSerializer(serializers.Serializer):
    """ Authentication Serializer ."""

    user = None
    email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(AuthenticationSerializer, self).__init__(*args, **kwargs)

    def validate(self, data):
        """ validates user's email and password """
        email, password = data.values()
        if email or password:
            self.user = authenticate(request=self.request, email=email, password=password)
            login(self.request, self.user)
        else:
            msg = _('Email address and password are required.')
            raise serializers.ValidationError(msg, code='authorization')

        if not self.user:
            msg = _('Unable to log in with provided credentials.')
            raise serializers.ValidationError(msg, code='authorization')
        return data

    def get_token(self):
        """ generates user token """
        if not self.user:
            msg = _('Unable to login with provided credentials.')
            raise serializers.ValidationError(msg, code="authorization")

        token, created = Token.objects.get_or_create(user=self.user)
        expiry_date = token.created + datetime.timedelta(days=settings.AUTH_TOKEN_EXPIRY_TIME)

        if not created and expiry_date < timezone.now():
            # delete token and generate a new one
            token.delete()
            token = Token.objects.create(user=self.user)
        return token


class RegistrationSerializer(serializers.ModelSerializer):
    """ Registration Serializer ."""

    user = None

    email = serializers.EmailField(
        validators=[UniqueValidator(
            queryset=User.objects.all(),
            message="This email is already taken."
        )]
    )
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'password',
            'confirm_password',
        )

    def validate(self, data):
        """ validates data to check credentials """
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            raise serializers.ValidationError(_("Passwords do not match."), code="authorization")
        return data

    def create(self, validated_data):
        """ creates user out of the passed data """
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.is_active = True
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    """ User Serializer ."""

    full_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'avatar',
            'date_joined',
            'date_updated',
        )

    def __init__(self, *args, **kwargs):
        return super(UserSerializer, self).__init__(*args, **kwargs)

    def get_full_name(self, instance):
        """ returns user's full name."""
        return instance.get_full_name()


class TokenSerializer(serializers.ModelSerializer):
    """ Token Serializer ."""

    class Meta:
        model = Token
        fields = '__all__'