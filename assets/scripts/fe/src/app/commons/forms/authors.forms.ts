import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export class AuthorForm {
  public form: FormGroup;

  constructor (data) {
    /* Initialize the form builder
    */
    this.form = new FormBuilder().group({
      name    : new FormControl(null, [Validators.required]),
    });
  }
}