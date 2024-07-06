import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { BooksListComponent } from "./books-list/books-list.component";
import { NgIf } from "@angular/common";
import { BookService } from "./book.service";
import { filter } from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BooksListComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  constructor(protected router: Router, private bookService: BookService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/') {
        this.bookService.setSelectedBook(undefined);
      }
    });
  }
}
