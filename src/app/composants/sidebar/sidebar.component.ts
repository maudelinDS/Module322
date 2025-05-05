import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isOpen = true;

  constructor(
    private router: Router,
    public authService: AuthService,
  ) {
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
