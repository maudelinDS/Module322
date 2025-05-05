import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    RouterOutlet
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
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
