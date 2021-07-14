import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export class CommentForm {
  public form: FormGroup;
  public err: string = null;
  public submitted: Boolean = false;

  constructor (data) {
    /* Initialize the form builder
     */
    this.form = new FormBuilder().group({
      message       : new FormControl(data.message, [Validators.required]),
      book_id      : new FormControl(data.book_id, [Validators.required]),
      user       : new FormControl(data.user),
    });
  }

  /* Check if form field is valid
   */
  valid (f) {
    return !(!this.form.get(f).valid && this.form.get(f).touched && this.submitted);
  }

  /* Check if the form field has an error
   */
  hasError (f, e) {
    return this.form.get(f).hasError(e) && (this.form.get(f).touched && this.submitted);
  }

  /* DEFAULT VALUE
   * set the value of the form fields if there is a default value.
   */
  defaultValue (d) {
    // set a timeout just incase that the value is not yet ready.
    this.form.patchValue(d);
  }

}
