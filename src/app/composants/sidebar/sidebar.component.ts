import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    RouterOutlet,
    MatIcon
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
    this.authService.logout();
    // on navigue d’abord vers '/login' (ou '/'), puis on reload
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
