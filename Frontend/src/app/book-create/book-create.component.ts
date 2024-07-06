import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BackendIp} from "../globals";
import {Book, BookService} from "../book.service";

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.css'
})
export class BookCreateComponent implements OnInit {
  constructor(private BookService: BookService, protected router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient) {
  }

  bookForm = this.formBuilder.group({
    title: '',
    author: '',
    published_date: '',
    isbn: '',
    pages: 0
  });

  ngOnInit() {
    this.BookService.setSelectedBook(undefined);
  }

  saveBook(): void {
    this.http.post<Book>(BackendIp + 'books/', this.bookForm.value).subscribe((response) => {
      this.BookService.getBooks();
      this.router.navigate(['/book/' + response.id]);
    });
  }
}
