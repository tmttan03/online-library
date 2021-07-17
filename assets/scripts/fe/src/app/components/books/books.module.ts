import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { OwnedBooksComponent } from './owned-books/owned-books.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthorsComponent } from './authors/authors.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [AddBookComponent, BorrowedBooksComponent, OwnedBooksComponent, AuthorsComponent]
})
export class BooksModule { }
