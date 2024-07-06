import {Component} from '@angular/core';
import {NgClass, NgFor, NgIf} from "@angular/common";
import {Book, BookService} from "../book.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})


export class BooksListComponent {

  constructor(private BookService: BookService, protected router: Router) {
  }

  selectBook(book: Book) {
    if (this.isBookSelected(book)) {
      this.router.navigate(['/']).then(r => r);
      this.BookService.setSelectedBook(undefined);
    } else {
      this.router.navigate(['/book', book.id]).then(r => r);
      this.BookService.setSelectedBook(book);
    }
  }

  isBookSelected(book: Book) {
    return book.id === this.BookService.selectedBook?.id;
  }

  getBooksList() {
    return this.BookService.getBooksList();
  }
}
