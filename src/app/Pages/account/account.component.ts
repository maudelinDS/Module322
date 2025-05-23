import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {UserService} from '../../services/users/users.service';
import {AuthService} from '../../services/auth/auth.service';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-account',
  imports: [
    MatCardModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    ReactiveFormsModule,
    MatButton,
    NgIf
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  user: any = [];
  idUserConnected: number = 0;
  userForm!: FormGroup;
  isLoading: boolean = false

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
  }


  ngOnInit() {
    this.idUserConnected = Number(this.authService.getCurrentUserId());
    this.getUserById()
    if (this.idUserConnected) {
      this.userService.getUtilisateur(this.idUserConnected).subscribe(user => {
        this.userForm = this.fb.group({
          id: [{ value: user.id, disabled: true }],
          first_name: [user.first_name],
          last_name: [user.last_name],
          email: [user.email],
          genre: [user.genre],
          langue: [user.langue],
          pays: [user.pays],
          phone: [user.phone],
          username: [user.username],
          password: [user.password]
        });
      });
    }
  }
  updateUser() {
    this.isLoading = true
    if (this.userForm.valid) {
      const updatedUser = this.userForm.getRawValue();
      this.userService.updateUtilisateur(this.idUserConnected, updatedUser).subscribe({
        next: () => {
          this.isLoading = false

          alert('Profil mis à jour avec succès !')
        },
        error: err => {
          console.error('Erreur de mise à jour', err)
          this.isLoading = false

        }
      });
    }
  }
  getUserById() {
    this.isLoading = true

    this.userService.getUtilisateur(this.idUserConnected).subscribe({
        next: (data) => {
          this.user = data
          this.isLoading = false
console.log(data)
        },
        error: err => {
          this.isLoading = false

          console.error('Erreur de mise à jour', err)
        }
      });

  }

}
