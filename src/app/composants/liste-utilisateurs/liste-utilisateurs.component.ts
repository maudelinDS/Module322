import {Component, OnInit} from '@angular/core';
import {MatCardModule, MatCardTitle} from '@angular/material/card';
import {MatList, MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatLine} from '@angular/material/core';
import {NgForOf} from '@angular/common';
import {UserService, Utilisateur} from '../../services/users/users.service';

@Component({
  selector: 'app-liste-utilisateurs',
  imports: [
    MatCardModule,
    MatCardTitle,
    MatList,
    MatListItem,
    MatIcon,
    MatLine,
    NgForOf
  ],
  templateUrl: './liste-utilisateurs.component.html',
  styleUrl: './liste-utilisateurs.component.css'
})
export class ListeUtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  constructor(private api: UserService) {}
  ngOnInit() {
    this.api.getUtilisateurs().subscribe(data => this.utilisateurs = data);
  }
}
