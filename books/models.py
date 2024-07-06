from django.core.validators import MinLengthValidator
from django.db import models


# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    published_date = models.DateField(auto_now=True)
    isbn = models.CharField(max_length=13, validators=[MinLengthValidator(10)])
    pages = models.IntegerField()

    def __str__(self):
        return self.title
