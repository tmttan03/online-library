import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

// Class for edit email form

export class EditEmailForm {
    public form: FormGroup;
    public err: string = null;
    public submitted: Boolean = false;

    constructor (data) {
      /* Initialize the form builder
       */
      this.form = new FormBuilder().group({
          email : new FormControl(null, [Validators.required, Validators.email]),
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