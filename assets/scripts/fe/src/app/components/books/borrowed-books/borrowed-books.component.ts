import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/commons/services/books/books.service';
import { NavigationService } from 'src/app/commons/services/navigation/navigation.service';

import { SearchForm } from 'src/app/commons/forms/search.forms';
import { SearchModel } from 'src/app/commons/models/search.model';
import { SimpleModalService } from 'ngx-simple-modal';
import { BookDetailsComponent } from '../../partials/modals/book-details/book-details.component';
import { ConfirmationMessageComponent } from '../../partials/modals/confirmation-message/confirmation-message.component';
import { AuthService } from 'src/app/commons/services/auth/auth.service';


@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {

  private form: SearchForm;
  books_list: any;
  all_books: any;

  constructor(
    private authService: AuthService,
    private nav: NavigationService,
    private booksService: BooksService,
    private simpleModalService: SimpleModalService,
  ) { }

  ngOnInit() {
    this.nav.changeHeaderTitle('Borrowed Books');
    this.form = new SearchForm(new SearchModel);

    this.booksService.getBorrowedBooks().subscribe(
      data => {
        this.all_books = data;
        this.books_list = this.all_books;
      }, error => {
        console.log(error)
      }
    )
  }

  returnBook(event, item) {
    event.stopPropagation();
    this.simpleModalService.addModal(ConfirmationMessageComponent, {has_error: false}).subscribe(
      (isTrue) => {
        if (isTrue) {
          this.booksService.returnBook({book_id: item.book.id}).subscribe(
            data => {
              item.book.status = 'available';
              item.returned_date = Date.now();
            }, error => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  filterClick(event, status) {
    event.preventDefault();
    if (status === 'all') {
      this.books_list = this.all_books;
    } else {
      this.books_list = this.all_books.filter(x => x.book.status === status);
    }
    this.form.form.controls['search_text'].setValue(null);
  }

  searchTitle(event){
    if (event.target.value === '') {
      this.books_list = this.all_books;
    }else{
      this.books_list = this.all_books.filter(x => x.book.title.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

  rowClicked(book) {
    this.simpleModalService.addModal(BookDetailsComponent, {
      has_error: false,
      book:book
    })
    .subscribe((isConfirmed)=>{});
  }

}
