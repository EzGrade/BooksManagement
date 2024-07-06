import {Routes} from '@angular/router';
import {BookViewComponent} from "./book-view/book-view.component";
import {BookEditComponent} from "./book-edit/book-edit.component";
import {BookCreateComponent} from "./book-create/book-create.component";

export const routes: Routes = [
  {
    "path": "book/:id",
    "component": BookViewComponent
  },
  {
    "path": "book/:id/edit",
    "component": BookEditComponent
  },
  {
    "path": "create",
    "component": BookCreateComponent
  }
];
