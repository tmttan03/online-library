from django.db import models
from users.models import User


class Author(models.Model):
    """Author Model """

    name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    """Book Model """

    AVAILABLE = 'available'
    CHECKED_OUT = 'checked out'
    DAMAGED = 'damaged'
    LOST = 'lost'

    STATUSES = (
        (AVAILABLE, 'Available'),
        (CHECKED_OUT, 'Checked Out'),
        (DAMAGED, 'Damaged'),
        (LOST, 'Lost'),
    )

    HARDCOVER = 'hardcover'
    PAPERBACK = 'paperback'
    DIGITAL_COPY = 'digital copy'

    TYPES = (
        (HARDCOVER, 'Hardcover'),
        (PAPERBACK, 'Paperback'),
        (DIGITAL_COPY, 'Digital Copy')
    )

    EXACTUS_OFFICE = 'exactus office'
    OWNERS_HOME = "owner's home"
    IN_THE_MATRIX = 'in the matrix'

    LOCATIONS = (
        (EXACTUS_OFFICE, 'Exactus Office'),
        (OWNERS_HOME, "Owner's Home"),
        (IN_THE_MATRIX, 'In the Matrix'),
    )

    title = models.CharField(max_length=255)
    plot = models.TextField(blank=True)
    type = models.CharField(default=HARDCOVER, max_length=20, choices=TYPES)
    location = models.CharField(default=EXACTUS_OFFICE, max_length=30, choices=LOCATIONS)
    status = models.CharField(default=AVAILABLE, max_length=20, choices=STATUSES)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    authors = models.ManyToManyField(Author, blank=True)
    thumbnail = models.ImageField(upload_to='books', default='/default/no-img.jpg')
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}".format(self.title)


class Checkout(models.Model):
    """Checkout Book Model """

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    returned_date = models.DateTimeField(blank=True, null=True)
    checked_out_by = models.ForeignKey(User, on_delete=models.CASCADE)
    checked_out_date = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    """Comment Model"""

    message = models.TextField()
    is_deleted = models.BooleanField(default=False)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)