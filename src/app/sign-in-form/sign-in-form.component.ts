import { Router } from '@angular/router';
import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {
  signinForm: FormGroup;
  constructor(private router: Router, private authS: AuthServiceService) {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit() {
  }

  signin(value: any) {
    this.authS.login(value.email, value.password)
      .then((user) => {
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        alert(err);
      })
  }



}
