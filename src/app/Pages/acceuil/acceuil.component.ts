import { Component } from '@angular/core';
import {SearchBarComponent} from '../../composants/search-bar/search-bar.component';

@Component({
  selector: 'app-acceuil',
  imports: [
    SearchBarComponent
  ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {

}
