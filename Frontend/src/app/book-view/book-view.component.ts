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
      this.bookService.updateSelectedBook();
      this.selectedBook = this.bookService.selectedBook;
    });
  }

  deleteBook() {
    if (this.selectedBook) {
      this.bookService.deleteBook(this.selectedBook);
      this.router.navigate(['/']).then(r => r);
    }
  }
}
