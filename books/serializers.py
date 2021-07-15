from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _

from .models import Book, Author, Comment, Checkout
from users.serializers import UserSerializer


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
        if self.instance:
            self.instance = self.create(validated_data)
        else:
            self.instance = self.update(self.instance, validated_data)
        return self.instance


class BookSerializer(serializers.ModelSerializer):

    owner = UserSerializer(required=False, allow_null=True, default=None)
    authors = AuthorSerializer(required=False, allow_null=True, many=True)

    class Meta:
        model = Book
        fields = ('id', 'title', 'plot', 'category', 'status', 'location',
                  'thumbnails', 'authors', 'owner', 'date_created', 'date_updated')

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(BookSerializer, self).__init__(*args, **kwargs)

    def create(self, validated_data):
        book = Book(
            title=validated_data.get('title', None),
            plot=validated_data.get('plot', None),
            category=validated_data.get('category', None),
            status=validated_data.get('status', None),
            location=validated_data.get('location', None),
            # thumbnails=validated_data.get('thumbnails', None),
            owner=self.request.user,
        )
        book.save()
        # for data in self.request.data.get('author'):
        #     author = Author.objects.get(id=data.get('id'))
        #     book.author.add(author)

    def update(self, instance, validated_data):
        title = validated_data.get('title', None)
        status = validated_data.get('status', None)
        category = validated_data.get('category', None)
        location = validated_data.get('location', None)
        author = self.request.data.get('author')

        if title is not None:
            instance.title = title

        if status is not None:
            instance.status = status

        if category is not None:
            instance.category = category

        if location is not None:
            instance.location = location

        instance.author.clear()
        if author is not None:
            for data in author:
                book_author = Author.objects.get(id=data.get('id'))
                instance.author.add(book_author)
        instance.save()
        return instance

    def save(self, **kwargs):
        validated_data = dict(list(self.validated_data.items()) + list(kwargs.items()))
        if self.instance:
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
        if self.instance:
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
        if self.instance:
            self.instance = self.create(validated_data)
        else:
            self.instance = self.update(self.instance, validated_data)
        return self.instance