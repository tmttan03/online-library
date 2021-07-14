import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";

export interface ConfirmModel {
  has_error: boolean,
}

@Component({
  selector: 'app-add-book-messages',
  templateUrl: './add-book-messages.component.html',
  styleUrls: ['./add-book-messages.component.css']
})
export class AddBookMessagesComponent extends SimpleModalComponent<ConfirmModel, boolean> implements OnInit {
  has_error: boolean;

  constructor() {
    super();
  }

  ngOnInit() {
    setTimeout(() => {
      this.close();
    }, 2000);
  }

}
