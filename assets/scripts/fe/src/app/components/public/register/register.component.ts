import { Component, OnInit } from '@angular/core';
import { RegisterForm } from 'src/app/commons/forms/register.forms';
import { AuthService } from 'src/app/commons/services/auth/auth.service';
import { StateService } from '@uirouter/core';
import { Register } from 'src/app/commons/models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private form: RegisterForm;
  private usernameErr = '';
  private emailErr = '';
  private passwordErr = '';
  private hasEmailError = false;
  private hasUsernameError = false;
  private mismatchedPassword = false;
  private disable = false;

  constructor(
    private auth: AuthService,
    private state: StateService
  ) { }


  ngOnInit() {
    this.form = new RegisterForm(new Register);
  }

  usernameInputChange(value) {
    if (this.hasUsernameError === true) {
      return this.hasUsernameError = false;
    }
  }

  emailInputChange(value) {
    if (this.hasEmailError === true) {
      return this.hasEmailError = false;
    }
  }

  passwordInputChange(value) {
    if (this.mismatchedPassword === true) {
      return this.mismatchedPassword = false;
    }
  }

  onSubmit({ value, valid }: { value: Register, valid: boolean }) {
    // send the form data to the backend if the value
    // format are valid.
    this.form.submitted = true;
    if (valid) {
      this.disable = true;
      this.auth.register(value)
        .then(resp => {
          this.state.go('register-login', {'new': true});
        })
        .catch(err => {
          this.form.err = err.error;
          this.disable = false;
          if (err.error.email) {
            this.emailErr = err.error.email;
            this.hasEmailError = true;
          }

          if (err.error.username) {
            this.usernameErr = err.error.username;
            this.hasUsernameError = true;
          }

          if (err.error.non_field_errors) {
            this.passwordErr = err.error.non_field_errors;
            this.mismatchedPassword = true;
          }
        })
      ;
    } else {
      this.disable = false;
      this.form.err = '';
    }
  }

  redirectLogin() {
    if (this.auth.authenticated()) {
      this.state.go('logout');
    } else {
      this.state.go('login');
    }
  }
}
