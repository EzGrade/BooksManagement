import {Component, OnInit} from '@angular/core';
import {Book, BookService} from "../book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {BackendIp} from "../globals";


@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  intIndex: number | undefined;
  selectedBook: Book | null = null;

  constructor(private BookService: BookService, protected router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient) {
  }

  bookForm = this.formBuilder.group({
    title: '',
    author: '',
    published_date: '',
    isbn: '',
    pages: 0
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.intIndex = parseInt(params['id'], 10);
      for (let i = 0; i < this.BookService.getBooksList().length; i++) {
        let currentBook = this.BookService.getBooksList()[i];
        if (currentBook.id === this.intIndex) {
          this.selectedBook = currentBook;
          this.BookService.setSelectedBook(currentBook);
          break;
        }
      }
      this.updateFormControls();
    });
  }

  updateFormControls(): void {
    if (this.selectedBook) {
      this.bookForm.patchValue({
        title: this.selectedBook.title,
        author: this.selectedBook.author,
        published_date: this.selectedBook.published_date,
        isbn: this.selectedBook.isbn,
        pages: this.selectedBook.pages
      });
    }
  }

  saveBook(): void {
    this.http.put(BackendIp + 'books/' + this.intIndex + '/', this.bookForm.value).subscribe(() => {
      this.BookService.getBooks();
      this.router.navigate(['/book/' + this.intIndex]);
    });
  }
}
