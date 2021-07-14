from django.conf import settings
from django.shortcuts import get_object_or_404, _get_queryset
from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, password=None,):
        """ Creates and saves a User with the given email and password. """
        if not email:
            raise ValueError('Enter a valid email address')
        if not password:
            raise ValueError('Enter a password')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """ Creates and saves a superuser with the given email and password. """
        user = self.create_user(email, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


def get_object_or_None(klass, *args, **kwargs):
    """
        Uses get() to return an object or None if the object does not exist.
        klass may be a Model, Manager, or QuerySet object. All other passed
        arguments and keyword arguments are used in the get() query.
        Note: Like with get(), a MultipleObjectsReturned will be raised if more than one
        object is found.
    """
    queryset = _get_queryset(klass)

    try:
        return queryset.get(*args, **kwargs)
    except queryset.model.DoesNotExist:
        return None
