from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _

from .models import Book, Author, Comment, Checkout
from users.serializers import UserSerializer
from drf_extra_fields.fields import Base64ImageField


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ('id', 'name')

    def __init__(self, *args, **kwargs):
        return super(AuthorSerializer, self).__init__(*args, **kwargs)

    def create(self, validated_data):
        author = Author(name=validated_data['name'])
        author.save()

    def save(self, **kwargs):
        validated_data = dict(
            list(self.validated_data.items()) +
            list(kwargs.items())
        )
        if not self.instance:
            self.instance = self.create(validated_data)
        else:
            self.instance = self.update(self.instance, validated_data)
        return self.instance


class BookSerializer(serializers.ModelSerializer):

    owner = UserSerializer(required=False, allow_null=True, default=None)
    authors = AuthorSerializer(required=False, allow_null=True, many=True)
    thumbnail = Base64ImageField(required=False)

    class Meta:
        model = Book
        fields = ('id', 'title', 'plot', 'type', 'status', 'location',
                  'thumbnail', 'authors', 'owner', 'date_created', 'date_updated')

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(BookSerializer, self).__init__(*args, **kwargs)

    def create(self, validated_data):
        book = Book(
            title=validated_data.get('title', None),
            plot=validated_data.get('plot', None),
            type=validated_data.get('type', None),
            status=validated_data.get('status', None),
            location=validated_data.get('location', None),
            owner=self.request.user,
        )
        if validated_data.get('thumbnail'):
            book.thumbnail=validated_data.get('thumbnail')
        book.save()
        for data in self.request.data.get('authors'):
            author = Author.objects.get_or_create(name=data.get('value'))
            book.authors.add(author)

    def update(self, instance, validated_data):
        title = validated_data.get('title', None)
        status = validated_data.get('status', None)
        plot = validated_data.get('plot', None)
        type = validated_data.get('type', None)
        location = validated_data.get('location', None)
        authors = self.request.data.get('authors')

        if title is not None:
            instance.title = title

        if status is not None:
            instance.status = status

        if plot is not None:
            instance.plot = plot

        if type is not None:
            instance.type = type

        if location is not None:
            instance.location = location

        instance.authors.clear()
        if authors is not None:
            for data in authors:
                author = Author.objects.create(name=data.get('value'))
                instance.authors.add(author)
        instance.save()
        return instance

    def save(self, **kwargs):
        validated_data = dict(list(self.validated_data.items()) + list(kwargs.items()))
        if not self.instance:
            self.instance = self.create(validated_data)
        else:
            self.instance = self.update(self.instance, validated_data)
        return self.instance


class CommentSerializer(serializers.ModelSerializer):

    book = BookSerializer(required=False, allow_null=True)
    user = UserSerializer(required=False, allow_null=True)

    class Meta:
        model = Comment
        fields = ('id', 'message', 'book', 'user', 'date_created', 'date_updated')

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(CommentSerializer, self).__init__(*args, **kwargs)

    def save(self, **kwargs):
        validated_data = dict(list(self.validated_data.items()) + list(kwargs.items()))
        if not self.instance:
            self.instance = self.create(validated_data)
        else:
            self.instance = self.update(self.instance, validated_data)
        return self.instance


class CheckoutSerializer(serializers.ModelSerializer):

    book = BookSerializer(required=False, allow_null=True)
    checked_out_by = UserSerializer(required=False, allow_null=True)

    class Meta:
        model=Checkout
        fields = ('id', 'book', 'checked_out_by', 'checked_out_date', 'returned_date')

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(CheckoutSerializer, self).__init__(*args, **kwargs)

    def save(self, **kwargs):
        validated_data = dict(list(self.validated_data.items()) + list(kwargs.items()))
        if not self.instance:
            self.instance = self.create(validated_data)
        else:
            self.instance = self.update(self.instance, validated_data)
        return self.instance