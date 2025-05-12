import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    MatIcon,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  errorMsg: string | undefined;
  isLoading: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {


  }
ngOnInit() {
  this
    .loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

  onSubmit() {
    this.isLoading = true
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.value.username,
        this.loginForm.value.password
      ).subscribe({
        next: () => {
          this.isLoading = false
          this.router.navigate(['/explore']).then(() => {
            window.location.reload();

          });
        },
        error: err => {
          this.isLoading = false
          this.errorMsg = err.message;
        }
      });
    }
  }

}
