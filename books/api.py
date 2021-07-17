import datetime

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .models import Book, Author, Checkout, Comment
from .serializers import BookSerializer, AuthorSerializer, CommentSerializer, CheckoutSerializer

from django.db.models import Q


class BookViewSet(ViewSet):

    serializer_class = BookSerializer
    permission_classes = (IsAuthenticated,)

    def all_books(self, *args, **kwargs):
        books = Book.objects.all().order_by('-date_created')
        serializer = self.serializer_class(books, many=True)
        return Response(serializer.data, status=200)

    def owned_books(self, *args, **kwargs):
        serializer = self.serializer_class(
            instance=Book.objects.filter(owner=self.request.user),
            many=True,
        )
        return Response(serializer.data, status=200)

    def add_book(self, *args, **kwargs):
        serializer = self.serializer_class(
            data=self.request.data, request=self.request
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({}, status=200)

    def update_book(self, *args, **kwargs):
        serializer = self.serializer_class(
            instance=Book.objects.get(id=self.request.data.get('id')),
            data=self.request.data,
            request=self.request
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=200)


class AuthorViewSet(ViewSet):

    serializer_class = AuthorSerializer
    permission_classes = (AllowAny,)

    def get(self, *args, **kwargs):
        authors = Author.objects.all()
        serializer = self.serializer_class(authors, many=True)
        return Response(serializer.data, status=200)


class CommentViewSet(ViewSet):

    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def get_comments(self, *args, **kwargs):
        serializer = self.serializer_class(
            instance=Comment.objects.filter(
                book__id=self.request.GET.get('book_id'),
                is_deleted=False
            ).order_by('date_created'),
            many=True,
        )
        return Response(serializer.data, status=200)

    def add_comment(self, *args, **kwargs):
        data = self.request.data
        try:
            book = Book.objects.get(id=data.get('book_id'))
            comment = Comment.objects.create(
                message=data.get('message'),
                user=self.request.user,
                book=book,
            )
            serializer = self.serializer_class(
                instance=comment,
            )
        except:
            message = {'status': 'An error has occured. Please try again.'}
            return Response(message, status=400)
        return Response(serializer.data, status=200)

    def delete_comment(self, *args, **kwargs):
        data = self.request.data
        try:
            comment = Comment.objects.get(id=data.get('comment_id'))
            comment.is_deleted = True
            comment.save()
            message = {'status': 'Success'}
        except:
            message = {'status': 'An error has occured. Please try again.'}
            return Response(message, status=400)
        return Response(message, status=200)


class CheckoutViewSet(ViewSet):

    serializer_class = CheckoutSerializer
    permission_classes = (IsAuthenticated,)

    def get_borrowed_books(self, *args, **kwargs):
        serializer = self.serializer_class(
            instance=Checkout.objects.filter(
                checked_out_by=self.request.user
            ).order_by('-checked_out_date'),
            many=True,
        )
        return Response(serializer.data, status=200)

    def is_checked_out(self, *args, **kwargs):
        data = self.request.GET
        book_obj = Book.objects.get(id=data.get('book_id'))
        message = {'status': False}
        if book_obj.status != 'available':
            serializer = self.serializer_class(
                instance=Checkout.objects.get(
                    book=book_obj,
                    checked_out_by=self.request.user,
                    returned_date__isnull=True),
            )
            message['status'] = True
            return Response(message, status=200)
        return Response(message, status=200)

    def checkout_book(self, *args, **kwargs):
        data = self.request.data
        try:
            book_obj = Book.objects.get(id=data.get('book_id'))
            if book_obj.status != 'available':
                message = {'status': 'Book is currently unavailable'}
                return Response(message, status=400)
            else:
                if book_obj.owner == self.request.user:
                    message = {'status': 'You are the owner of this book'}
                    return Response(message, status=400)
                else:
                    checkout_obj = Checkout.objects.create(
                        book=book_obj,
                        checked_out_by=self.request.user
                    )
                    book_obj.status=Book.CHECKED_OUT
                    book_obj.save()
                    message = {'status': 'Success'}
        except:
            message = {'status': 'Something went wrong try again'}
            return Response(message, status=400)
        return Response(message, status=200)

    def return_book(self, *args, **kwargs):
        data = self.request.data
        try:
            book_obj = Book.objects.get(id=data.get('book_id'))
            if book_obj.status == 'checked out':
                if book_obj.owner == self.request.user:
                    message = {'status': 'You are the owner of this book'}
                    return Response(message, status=400)
                else:
                    checkout_obj = Checkout.objects.get(
                        book=book_obj,
                        checked_out_by=self.request.user,
                        returned_date__isnull=True
                    )
                    checkout_obj.returned_date = datetime.datetime.now()
                    book_obj.status=Book.AVAILABLE
                    checkout_obj.save()
                    book_obj.save()
                    message = {'status': 'Success'}
            else:
                message = {'status': 'Book is currently unavailable'}
                return Response(message, status=400)
        except:
            message = {'status': 'Something went wrong try again'}
            return Response(message, status=400)
        return Response(message, status=200)