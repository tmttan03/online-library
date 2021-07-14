import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";

export interface ConfirmModel {
  has_error: boolean,
}


@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent extends SimpleModalComponent<ConfirmModel, boolean> implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

  confirm() {
    this.result = true;
    this.close();
  }

  cancel() {
    this.result = false;
    this.close();
  }

}
