import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";

import { UpdateBookForm } from 'src/app/commons/forms/books.forms';
import { Books } from 'src/app/commons/models/book.model';
import { AddBookMessagesComponent } from '../add-book-messages/add-book-messages.component';

export interface ConfirmModel {
  book: any
}

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent extends SimpleModalComponent<ConfirmModel, any> implements OnInit {

  private form: UpdateBookForm;
  private author_list = [];
  book: any;

  constructor() {
    super();
   }

  ngOnInit() {
    this.intializeForm();
  }

  intializeForm() {
    this.form = new UpdateBookForm(new Books);
    this.form.defaultValue(this.book);

    Object(this.book.authors).forEach((element, index) => {
      this.author_list.push({
        'value': element.name,
        'display': element.name,
      })
    });
  }

  onSubmit({ value, valid }: { value: Books, valid: boolean }) {
    if (valid) {
      if (this.form.form.dirty || this.hasChanges()) {
        value.authors = this.author_list;
        this.result = value;
      }
      this.close();
    }
  }

  onChangeType(){
    if(this.form.form.controls['type'].value === 'digital copy'){
      this.form.form.controls['location'].setValue('in the matrix');
    } else if(this.form.form.controls['location'].value === 'in the matrix' &&
      this.form.form.controls['type'].value !== 'digital copy'){
      this.form.form.controls['location'].setValue('exactus office');
    }
  }

  hasChanges() {
    if(this.author_list.length === this.book.authors.length){
      const results = this.author_list.filter(({ value: value }) => !this.book.authors.some(({ name: name }) => name === value));
      if(results.length > 0){
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
}
