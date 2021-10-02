import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params.returnUrl;
    });
  }

  ngOnInit(): void {}

  loginForm: FormGroup;
  userToken: string | undefined;
  TOKEN_KEY = 'token';
  returnUrl: string | undefined;

  onLogin() {
    if (this.loginForm.valid) {
      if (this.service.logIn(this.loginForm.value)) {
        this.router.navigateByUrl('/' + this.returnUrl);
      }
    }
  }

  onLogout() {
    if (this.service.isAuthenticated) {
      this.router.navigateByUrl('/');
    }
  }

  get isUserAuthenticated() {
    return this.service.isAuthenticated;
  }
}
