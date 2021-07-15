from django.contrib import admin
from .models import Book, Author, Checkout, Comment


class AuthorAdmin(admin.ModelAdmin):
    model = Author
    ordering = ('id',)
    search_fields = ('name',)
    list_display = ('id', 'name')


class BookAdmin(admin.ModelAdmin):
    model = Book
    ordering = ('date_created',)
    filter_horizontal = ('authors',)
    readonly_fields = ('date_created', 'date_updated')
    search_fields = ('title', 'status', 'location', 'category',)
    list_display = ('title',
                    'plot',
                    'status',
                    'category',
                    'location',
                    'owner',
                    'date_created',
                    'date_updated'
                )


class CheckoutAdmin(admin.ModelAdmin):
    model = Checkout
    ordering = ('book',)
    readonly_fields = ('checked_out_date', 'returned_date')
    list_display = ('book',
                    'checked_out_by',
                    'checked_out_date',
                    'returned_date'
                )


class CommentAdmin(admin.ModelAdmin):
    model = Comment
    ordering = ('date_created',)
    readonly_fields = ('date_created', 'date_updated')
    list_display = ('message',
                    'user',
                    'book',
                    'is_deleted',
                    'date_created',
                    'date_updated'
                )

admin.site.register(Book, BookAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(Checkout, CheckoutAdmin)
admin.site.register(Comment, CommentAdmin)