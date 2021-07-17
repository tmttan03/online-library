import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { OwnedBooksComponent } from './owned-books/owned-books.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorsComponent } from './authors/authors.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
  ],
  declarations: [AddBookComponent, BorrowedBooksComponent, OwnedBooksComponent, AuthorsComponent]
})
export class BooksModule { }
