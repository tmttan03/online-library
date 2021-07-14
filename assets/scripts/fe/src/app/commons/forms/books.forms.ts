import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export class BookForm {
  public form: FormGroup;
  public err: string = null;
  public submitted: Boolean = false;

  constructor (data) {
    /* Initialize the form builder
     */
    this.form = new FormBuilder().group({
      title           : new FormControl(data.title, [Validators.required]),
      author          : new FormControl(data.author, [Validators.required]),
      owner           : new FormControl(data.owner),
      is_digital_copy : new FormControl(data.is_digital_copy),
      location        : new FormControl(data.location, [Validators.required]),
      status          : new FormControl(data.status, [Validators.required]),
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

export class UpdateBookForm {
  public form: FormGroup;
  public err: string = null;
  public submitted: Boolean = false;

  constructor (data) {
    /* Initialize the form builder
     */
    this.form = new FormBuilder().group({
      id              : new FormControl(data.id),
      title           : new FormControl(data.title, [Validators.required]),
      author          : new FormControl(data.author, [Validators.required]),
      location        : new FormControl(data.location, [Validators.required])
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

