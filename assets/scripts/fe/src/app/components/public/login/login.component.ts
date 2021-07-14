import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/commons/services/auth/auth.service';
import { StateService } from '@uirouter/core';
import { LoginForm } from 'src/app/commons/forms/login.forms';
import { Login } from 'src/app/commons/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private form : LoginForm;
  private isActivated = false;
  private hasError = false;
  private new = false;

  constructor(
    private auth: AuthService,
    private state: StateService,
  ) { }

  ngOnInit() {
    // initialize the form.
    this.form = new LoginForm(new Login);
    if (this.auth.authenticated()) return this.state.go('dashboard');

    if (this.state.params.new === 'true') {
      this.new = true;

      setTimeout(() => {
        this.new = false;
      }, 3000);
    }
  }

  inputChange(value) {
    if (this.hasError === true) {
      this.hasError = false;
    }
  }

  onSubmit({ value, valid }: { value: Login, valid: boolean }) {
    // send the form data to the backend if the value
    // format are valid.
    this.form.submitted = true;
    if (valid) {
      this.auth.login(value)
        .then(resp => {
          // redirect the user to the last page
          // he/she tried to access before logging in
          try {
            // gets the first matched url
            const prevState = this.state.get().filter(state => state.$$state().url.exec(this.state.params.next));
            console.log(prevState)
            if (prevState.length !== 0) {
              const redirectUrl = prevState.shift().name;
              console.log(redirectUrl)
              if (redirectUrl !== 'login') {
                if (redirectUrl === 'register-login' ) {
                  this.state.go('dashboard');
                } else {
                  this.state.go(redirectUrl);
                }
              } else {
                this.state.go('dashboard');
              }
            } else {
              this.state.go('dashboard');
            }
          } catch (error) {
            this.state.go('login');
          }
        })
        .catch(err => {
          this.form.err = err;
        });
      }
    }

    register(event) {
      event.preventDefault();
      this.state.go('register');
    }
}
