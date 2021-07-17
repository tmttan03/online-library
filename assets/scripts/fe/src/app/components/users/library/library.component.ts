import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { SearchForm } from 'src/app/commons/forms/search.forms';
import { SearchModel } from 'src/app/commons/models/search.model';
import { AuthService } from 'src/app/commons/services/auth/auth.service';
import { BooksService } from 'src/app/commons/services/books/books.service';
import { NavigationService } from 'src/app/commons/services/navigation/navigation.service';
import { BookDetailsComponent } from '../../partials/modals/book-details/book-details.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

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

    this.nav.changeHeaderTitle('Library');
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

  onSubmit({ value, valid }: { value: SearchModel, valid: boolean }) {
    if (valid) {
      this.books_list = this.all_books.filter(x => x.title.toLowerCase().includes(value.search_text.toLowerCase()));
    } else {
      if (value.search_text === '') {
        this.books_list = this.all_books;
      }
    }
  }

  rowClicked(book) {
    this.simpleModalService.addModal(BookDetailsComponent, {
      has_error: false,
      book: book
    })
    .subscribe((isConfirmed) => {
    });
  }

  filterTypeClick(event, type) {
    event.preventDefault();
    if ( type === 'all') {
      this.books_list = this.all_books;
    } else {
      this.books_list = this.all_books.filter(x => x.type === type);
    }
    this.form.form.controls['search_text'].setValue(null);
  }

  filterLocationClick(event, location) {
    event.preventDefault();
    if ( location === 'all') {
      this.books_list = this.all_books;
    } else {
      this.books_list = this.all_books.filter(x => x.location === location);
    }
    this.form.form.controls['search_text'].setValue(null);
  }

  searchTitle(event){
    if (event.target.value === '') {
      this.books_list = this.all_books;
    }else{
      this.books_list = this.all_books.filter(x => x.title.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }


}
