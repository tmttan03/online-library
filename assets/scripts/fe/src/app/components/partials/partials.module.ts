import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailsComponent } from './modals/book-details/book-details.component';
import { AddBookMessagesComponent } from './modals/add-book-messages/add-book-messages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationMessageComponent } from './modals/confirmation-message/confirmation-message.component';
import { UpdateBookComponent } from './modals/update-book/update-book.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavigationComponent,
    BookDetailsComponent,
    AddBookMessagesComponent,
    ConfirmationMessageComponent,
    UpdateBookComponent],
  entryComponents: [
    BookDetailsComponent,
    AddBookMessagesComponent,
    ConfirmationMessageComponent,
    UpdateBookComponent
  ],
})
export class PartialsModule { }
