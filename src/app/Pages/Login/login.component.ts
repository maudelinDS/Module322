import {Component} from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder
    ,
              private router: Router
  ) {
    this
      .loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      // TODO: call auth service
      console.log('Logged in:', this.loginForm.value);
      // Navigate to home or dashboard
      this.router.navigate(['/utilisateurs']);
    }
  }
}
