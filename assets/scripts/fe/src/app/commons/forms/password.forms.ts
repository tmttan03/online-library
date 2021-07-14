import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";


// Class for edit password form
export class EditPasswordForm {
    public form: FormGroup;
    public err: string = null;
    public submitted: Boolean = false;
    // Password must contain at least one letter, one number, and one symbol.. 
    public pattern: string = "[^\w\d]*(([0-9]+.*[A-Za-z]+.*[#$@!%&*?_]+.*)|[A-Za-z]+.*([0-9]+.*)[#$@!%&*?_]+.*|[A-Za-z]+.*[#$@!%&*?_]+.*([0-9]+.*)|[#$@!%&*?_]+.*([0-9]+.*)[A-Za-z]+.*)";
    //Validators.pattern(this.pattern)
    constructor (data) {
      /* Initialize the form builder
       */

      this.form = new FormBuilder().group({
          old_password : new FormControl(null, [Validators.required]),
          new_password : new FormControl(null, [Validators.required, Validators.minLength(8),]),
          confirm_new_password : new FormControl(null, [Validators.required, Validators.minLength(8),])
      })
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

// Class for add password form
export class AddPasswordForm {
    public form: FormGroup;
    public err: string = null;
    public submitted: Boolean = false;

    constructor (data) {
      /* Initialize the form builder
       */
      this.form = new FormBuilder().group({
          new_password : new FormControl(null, [Validators.required]),
          confirm_new_password : new FormControl(null, [Validators.required])
      })
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



  export class ForgotPasswordForm {
    public form: FormGroup;
    public err: string = null;
    public submitted: Boolean = false;

    constructor (data) {
      /* Initialize the form builder
       */
      this.form = new FormBuilder().group({
          email : new FormControl(null, [Validators.required, Validators.email]),
      })
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


  export class ResetPasswordForm {
    public form: FormGroup;
    public err: string = null;
    public submitted: Boolean = false;

    constructor (data) {
      /* Initialize the form builder
       */
      this.form = new FormBuilder().group({
          new_password : new FormControl(null, [Validators.required]),
          confirm_new_password : new FormControl(null, [Validators.required]),
      })
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