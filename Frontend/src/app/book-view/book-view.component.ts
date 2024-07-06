import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book, BookService} from "../book.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  intIndex: number | null = null;
  selectedBook: Book | undefined;

  constructor(private route: ActivatedRoute, private bookService: BookService, protected router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.intIndex = parseInt(params['id'], 10);
      this.selectedBook = this.bookService.booksList.find(book => book.id === this.intIndex);
      this.bookService.setSelectedBook(this.selectedBook);
    });
  }

  deleteBook() {
    if (this.selectedBook) {
      let previousIndex = this.bookService.booksList.findIndex(book => book.id === this.selectedBook?.id);
      this.bookService.deleteBook(this.selectedBook);
      this.router.navigate(['/book/' + this.bookService.booksList[previousIndex].id]);
    }
  }
}
