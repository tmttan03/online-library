import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { BookForm } from 'src/app/commons/forms/books.forms';
import { Books } from 'src/app/commons/models/book.model';
import { AuthService } from 'src/app/commons/services/auth/auth.service';
import { BooksService } from 'src/app/commons/services/books/books.service';
import { NavigationService } from 'src/app/commons/services/navigation/navigation.service';
import { AddBookMessagesComponent } from '../../partials/modals/add-book-messages/add-book-messages.component'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  private form: BookForm;
  private author_list = [];
  private default_status = 'available';

  constructor(
    private state: StateService,
    private nav: NavigationService,
    private booksService: BooksService,
    private simpleModalService: SimpleModalService
  ) { }

  ngOnInit() {
    this.nav.changeHeaderTitle('Add Book');
    this.intializeForm();
  }

  onSubmit({ value, valid }: { value: Books, valid: boolean }) {
    if (valid) {
      //append author_list to this.form.form.author
      
      this.booksService.addBook(value).subscribe(
        data => {
          this.simpleModalService.addModal(AddBookMessagesComponent, {has_error:false}).subscribe();
          this.intializeForm();
        }, error => {
          this.simpleModalService.addModal(AddBookMessagesComponent, {has_error:true}).subscribe();
          this.intializeForm();
        }
      );
    }
  }

  intializeForm() {
    this.form = new BookForm(new Books);
    this.form.form.controls['status'].setValue('available');
    this.form.form.controls['type'].setValue('hardcover');
    this.form.form.controls['location'].setValue('exactus office');
  }

  onChangeType(){
    if(this.form.form.controls['type'].value === 'digital copy'){
      this.form.form.controls['location'].setValue('in the matrix');
    } else if(this.form.form.controls['location'].value === 'in the matrix' &&
      this.form.form.controls['type'].value !== 'digital copy'){
      this.form.form.controls['location'].setValue('exactus office');
    }
  }

  navigationRedirect(event, route){
    event.preventDefault();
    this.state.go(route);
  }

}
