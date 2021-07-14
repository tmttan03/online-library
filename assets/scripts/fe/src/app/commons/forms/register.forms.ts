import * as _ from 'lodash';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export class RegisterForm {
  public form: FormGroup;
  public err: string = null;
  public submitted: Boolean = false;

  constructor (data) {
    /* Initialize the form builder
    */
    this.form = new FormBuilder().group({
      first_name    : new FormControl(null, [Validators.required]),
      last_name    : new FormControl(null, [Validators.required]),
      email    : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required]),
      confirm_password : new FormControl(null, [Validators.required]),
    });
  }

  /* Check if form field is valid
   */
  valid (f) {
    return !(!this.form.get(f).valid && (this.form.get(f).touched || this.submitted));
  }

  /* Check if the form field has an error
   */
  hasError (f, e) {
    return this.form.get(f).hasError(e) && (this.form.get(f).touched || this.submitted);
  }
}