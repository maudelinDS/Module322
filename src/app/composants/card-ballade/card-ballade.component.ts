import {Component, Input} from '@angular/core';
import {MatCardModule, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-card-ballade',
  imports: [
    MatCardModule,
    MatCardTitle,
    MatCardContent,

    NgIf
  ],
  templateUrl: './card-ballade.component.html',
  styleUrl: './card-ballade.component.css'
})
export class CardBalladeComponent {

  @Input() title: string = 'Card Title'; // Titre de la carte
  @Input() content: string = 'Card Content'; // Contenu de la carte
  @Input() imageUrl: string = ''; // URL de l'image d'en-tête

  // Méthode pour l'action du bouton
  onClick() {
    console.log('Card Action clicked!');
  }

}
