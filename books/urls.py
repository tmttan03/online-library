from django.urls import path, re_path
from .api import BookViewSet, AuthorViewSet, CommentViewSet, CheckoutViewSet

urlpatterns = [

    ### Books ###
    #/api/books/ - Get all the books
    path('', BookViewSet.as_view({
        'get': 'all_books',
    }), name="books_list"),

    #/api/books/owned/ - Get all the owned books
    path('owned/', BookViewSet.as_view({
        'get': 'owned_books',
    }), name="owned_books"),

    #/api/books/add-book/ - Add Book
    path('add-book/', BookViewSet.as_view({
        'post': 'add_book',
    }), name="add_book"),

    #/api/books/update-book/ - Update book
    path('update-book/', BookViewSet.as_view({
        'put': 'update_book',
    }), name="update_book"),

    ### Authors ###
    #/api/books/authors/ - Get all authors
    path('authors/', AuthorViewSet.as_view({
        'get': 'get',
    }), name="author_list"),

    ### Comments ###
    #/api/books/comments/ - Get all comments
    path('comments/', CommentViewSet.as_view({
        'get': 'get_comments'
    }), name='comment_list'),

    #/api/books/add-comment/ - Add comment
    path('add-comment/', CommentViewSet.as_view({
        'post': 'add_comment'
    }), name='add_comment'),

    #/api/books/delete-comment/ - Delete comment
    path('delete-comment/', CommentViewSet.as_view({
        'post': 'delete_comment'
    }), name='delete_comment'),

    ### Checkout ###
    #/api/books/borrowed-books/ - Get All Borrowed Books
    path('borrowed-books/', CheckoutViewSet.as_view({
        'get': 'get_borrowed_books',
    }), name="borrowed_books"),

    #/api/books/checkout-book/ - Checkout A Book
    path('checkout-book/', CheckoutViewSet.as_view({
        'post': 'checkout_book'
    }), name='checkout_book'),

    #/api/books/return-book/ - Return A Book
    path('return-book/', CheckoutViewSet.as_view({
        'post': 'return_book'
    }), name='return_book'),

    #/api/books/is-checkout-book/ - Is Checked Out
    path('is-checked-out/', CheckoutViewSet.as_view({
        'get': 'is_checked_out'
    }), name='is_checkout_out'),
]