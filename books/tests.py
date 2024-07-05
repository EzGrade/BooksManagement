from django.test import TestCase

from books.models import Book
from books.serializers import BookSerializer


# Create your tests here.
class BookTestCase(TestCase):
    def setUp(self):
        self.book = Book.objects.create(
            title='The Catcher in the Rye',
            author='J.D. Salinger',
            isbn='9783161484100',
            pages=234
        )
        self.serialized_book = BookSerializer(self.book).data

    def test_get_books_list(self):
        response = self.client.get('/books/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(self.serialized_book, response.data)

    def test_get_book(self):
        response = self.client.get(f'/books/{self.book.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.serialized_book, response.data)

    def test_get_non_existent_book(self):
        response = self.client.get('/books/999/')
        self.assertEqual(response.status_code, 404)

    def test_create_book(self):
        new_book = {
            'title': 'The Great Gatsby',
            'author': 'F. Scott Fitzgerald',
            'isbn': '9783161484101',
            'pages': 180
        }
        response = self.client.post('/books/', new_book)
        self.assertEqual(response.status_code, 201)

        book = Book.objects.get(pk=response.data['id'])
        serialized_book = BookSerializer(book).data
        self.assertEqual(serialized_book, response.data)

    def test_update_book(self):
        updated_book = {
            'title': 'The Great Gatsby',
            'author': 'F. Scott Fitzgerald',
            'isbn': '9783161484101',
            'pages': 180
        }
        response = self.client.put(f'/books/{self.book.id}/', updated_book, content_type='application/json')
        self.assertEqual(response.status_code, 200)

        book = Book.objects.get(pk=self.book.id)
        serialized_book = BookSerializer(book).data
        self.assertEqual(serialized_book, response.data)

    def test_delete_book(self):
        response = self.client.delete(f'/books/{self.book.id}/')
        self.assertEqual(response.status_code, 204)

        with self.assertRaises(Book.DoesNotExist):
            Book.objects.get(pk=self.book.id)
