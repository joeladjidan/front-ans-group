import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationRequest} from '../../../gs-api/src/models/authentication-request';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;

  password = '';
  return = '';

  authenticationRequest: AuthenticationRequest = {};
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }


  login() {
    this.authenticationRequest = {
      login: this.loginForm.get('email') ?.value,
      password: this.loginForm.get('password') ?.value,
    }

    this.userService.login(this.authenticationRequest)
      .pipe(first())
      .subscribe((data) => {
        this.userService.setAccessToken(data);
        this.getUserByEmail();
        this.userService.loggedIn.next(true);
        this.router.navigate(['']);
      }, error => {
        this.errorMessage = 'Login et / ou mot de passe incorrecte';
      });
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.login();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }



  getUserByEmail(): void {
    this.userService.getUserByEmail(this.authenticationRequest.login)
      .subscribe(user => {
        this.userService.setConnectedUser(user);
        console.log(this.userService.setConnectedUser(user));
      });
  }

}
function MustMatch(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}


