import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from "ngx-simple-modal";
import { CommentForm } from 'src/app/commons/forms/comment.forms';
import { CommentModel } from 'src/app/commons/models/comment';
import { AuthService } from 'src/app/commons/services/auth/auth.service';
import { BooksService } from 'src/app/commons/services/books/books.service';

import { ConfirmationMessageComponent } from '../../modals/confirmation-message/confirmation-message.component'
export interface ConfirmModel {
  has_error: boolean,
  book: any
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent extends SimpleModalComponent<ConfirmModel, boolean> implements OnInit {

  private form: CommentForm;
  has_error = false;
  book: any;
  comments_list: any;
  isCheckedOut = false;

  constructor(
    private booksService: BooksService,
    private authService: AuthService,
    private simpleModalService: SimpleModalService
  ) {
    super();
   }

  ngOnInit() {
    this.booksService.getAllComments(this.book.id).subscribe(
      data => {
        this.comments_list = data;
      }, error => {
        console.log(error);
      }
    );

    this.intializeForm();

    this.booksService.isCheckedOut(this.book.id).subscribe(
      data => {
        this.isCheckedOut = Object(data).status;
      }, error => {
        console.log(error);
      }
    );
  }


  confirm() {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.result = true;
    this.close();
  }

  borrowBook() {
    this.simpleModalService.addModal(ConfirmationMessageComponent, {has_error: false}).subscribe(
      (isTrue) => {
        if (isTrue) {
          this.booksService.checkoutBook({book_id: this.book.id}).subscribe(
            data => {
              this.book.status = 'checked out';
              this.isCheckedOut = true;
            }, error => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  returnBook() {
    this.simpleModalService.addModal(ConfirmationMessageComponent, {has_error: false}).subscribe(
      (isTrue) => {
        if (isTrue) {
          this.booksService.returnBook({book_id: this.book.id}).subscribe(
            data => {
              this.book.status = 'available';
              this.isCheckedOut = false;
            }, error => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  intializeForm() {
    this.form = new CommentForm(new CommentModel);
    this.form.form.controls['book_id'].setValue(this.book.id);
    this.form.form.controls['user'].setValue(this.authService.user_id);
  }

  onSubmit({ value, valid }: { value: CommentModel, valid: boolean }) {
    if (valid) {
      this.booksService.addComment(value).subscribe(
        data => {
          this.comments_list.push(data);
          this.intializeForm();
        }, error => {
          console.log(error);
          this.intializeForm();
        }
      );
    }
  }

  deleteClick(comment_id) {
    this.booksService.deleteComment({'comment_id': comment_id}).subscribe(
      data => {
        this.comments_list = this.comments_list.filter(x => x.id !== comment_id);
      }, error => {
        console.log(error);
      }
    );
  }


}
