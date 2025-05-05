import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatAnchor} from '@angular/material/button';
import {SidebarComponent} from './composants/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MapWay';
}
