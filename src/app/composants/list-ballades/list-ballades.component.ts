import {Component, OnInit} from '@angular/core';
import {MatList, MatListItem} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {UserService, Utilisateur} from '../../services/users/users.service';
import {Ballades, BalladesService} from '../../services/ballades/ballades.service';
import {MatLine} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-list-ballades',
  imports: [
    MatIcon,
    MatLine,
    MatList,
    MatListItem,
    NgForOf,
    MatIcon,
    MatLine,
  ],
  templateUrl: './list-ballades.component.html',
  styleUrl: './list-ballades.component.css'
})
export class ListBalladesComponent implements OnInit {
  ballades: Ballades[] = [];

  constructor(private api: BalladesService) {
  }

  ngOnInit() {
    this.api.getBallades().subscribe(data => this.ballades = data);
  }
}
