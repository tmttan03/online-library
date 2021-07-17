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
  private image_url;
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
      value.authors = this.author_list;
      value.status = this.default_status;
      value.thumbnail=this.image_url;
      
      this.booksService.addBook(value).subscribe(
        data => {
          this.simpleModalService.addModal(AddBookMessagesComponent, {has_error:false}).subscribe();
          this.intializeForm();
          this.author_list = [];
        }, error => {
          this.simpleModalService.addModal(AddBookMessagesComponent, {has_error:true}).subscribe();
          this.intializeForm()
          this.author_list = [];
        }
      );
    }
  }

  intializeForm() {
    this.form = new BookForm(new Books);
    // this.form.form.controls['status'].setValue('available');
    this.form.form.controls['type'].setValue('hardcover');
    this.form.form.controls['location'].setValue('exactus office');
    this.removeImg();
  }

  onChangeType(){
    if(this.form.form.controls['type'].value === 'digital copy'){
      this.form.form.controls['location'].setValue('in the matrix');
    } else if(this.form.form.controls['location'].value === 'in the matrix' &&
      this.form.form.controls['type'].value !== 'digital copy'){
      this.form.form.controls['location'].setValue('exactus office');
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => { 
        this.image_url = event.target.result;
      }
    }
  }

  removeImg(){
    this.image_url = null;
    this.form.form.controls['thumbnail'].setValue(null)
  }

  navigationRedirect(event, route){
    event.preventDefault();
    this.state.go(route);
  }

}
