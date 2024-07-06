import {Injectable} from '@angular/core';
import {BackendIp} from "./globals";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

export interface Book {
  id: number;
  title: string;
  author: string;
  published_date: string;
  isbn: string;
  pages: number;
}

@Injectable({
  providedIn: 'root'
})

export class BookService {
  selectedBook: Book | undefined;
  booksList: Book[] = [];

  constructor(private http: HttpClient) {
    this.getBooks();
    this.retrieveSelectedBookFromLocalStorage();
    this.retrieveBooksListFromLocalStorage();
  }

  private retrieveSelectedBookFromLocalStorage() {
    const storedBook = localStorage.getItem('selectedBook');
    this.selectedBook = storedBook ? JSON.parse(storedBook) : undefined;
  }

  private retrieveBooksListFromLocalStorage() {
    const storedBooks = localStorage.getItem('booksList');
    this.booksList = storedBooks ? JSON.parse(storedBooks) : [];
  }

  setBooksList(books: Book[]) {
    this.booksList = books;
    localStorage.setItem('booksList', JSON.stringify(books));
  }

  getBooksList() {
    return this.booksList;
  }

  setSelectedBook(book: Book | undefined) {
    this.selectedBook = book;
    if (book) {
      localStorage.setItem('selectedBook', JSON.stringify(book));
    } else {
      localStorage.removeItem('selectedBook');
    }
  }

  updateSelectedBook() {
    this.getBooks();
    this.retrieveBooksListFromLocalStorage();
    let newSelectedBook = this.booksList.find(book => book.id === this.selectedBook?.id);
    if (newSelectedBook) {
      this.setSelectedBook(newSelectedBook);
    }
  }

  getBooks() {
    this.http.get<Book[]>(BackendIp + 'books/').pipe(
      map(response => response)
    ).subscribe(books => {
      this.setBooksList(books);
    });
  }

  deleteBook(book: Book) {
    this.http.delete(BackendIp + 'books/' + book.id + '/').subscribe(() => {
      this.getBooks();
    });
  }
}
