import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
// import { DatePipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';

import { SearchForm } from 'src/app/commons/forms/search.forms';
import { SearchModel } from 'src/app/commons/models/search.model';

import { NavigationService } from 'src/app/commons/services/navigation/navigation.service';
import { AuthService } from 'src/app/commons/services/auth/auth.service';
import { BooksService } from 'src/app/commons/services/books/books.service';
import { SimpleModalService } from "ngx-simple-modal";

import { BookDetailsComponent } from '../../partials/modals/book-details/book-details.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  books_list: any;
  all_books: any;
  private form: SearchForm;

  constructor(
    private nav: NavigationService,
    private auth: AuthService,
    private state: StateService,
    private booksService: BooksService,
    private simpleModalService: SimpleModalService
  ) { }

  async ngOnInit() {

    this.nav.changeHeaderTitle('Dashboard');
    this.form = new SearchForm(new SearchModel);

    setTimeout(() => {
      this.nav.hasLoaded = false;
    }, 100);

    this.auth.getUser();

    if (this.auth.user.id == null) {
      // get user information from the backend. (sync)
      await this.auth.setuser();
    }

    this.booksService.getAllBooks().subscribe(
      data => {
        this.all_books = data;
        this.books_list = this.all_books;
      }, error => {
        console.log(error);
      }
    );
  }

  rowClicked(book) {
    this.simpleModalService.addModal(BookDetailsComponent, {
      has_error: false,
      book: book
    })
    .subscribe((isConfirmed) => {
    });
  }

  navigationRedirect(event, route){
    event.preventDefault();
    this.state.go(route);
  }

  searchTitle(event){
    if (event.target.value === '') {
      this.books_list = this.all_books;
    }else{
      this.books_list = this.all_books.filter(x => x.title.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

}


