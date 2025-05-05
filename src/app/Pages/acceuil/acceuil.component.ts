import {Component, OnInit} from '@angular/core';
import {SearchBarComponent} from '../../composants/search-bar/search-bar.component';
import {CardBalladeComponent} from '../../composants/card-ballade/card-ballade.component';
import {Ballades, BalladesService} from '../../services/ballades/ballades.service';
import {NgForOf, NgIf} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ListBalladesComponent} from '../../composants/list-ballades/list-ballades.component';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-acceuil',
  imports: [
    SearchBarComponent,
    CardBalladeComponent,
    NgForOf,
    NgIf,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatButton,
    ListBalladesComponent,
    MatCardModule
  ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {

  ballades: Ballades[] = [];
  showCardDetail: boolean = false;
  selectedBallades: any ;

  mapUrl!: SafeResourceUrl;


  constructor(
    private balladesService: BalladesService,
    private sanitizer: DomSanitizer

  ) {
  }

  showBalladeDetail(ballade: Ballades) {
    this.showCardDetail = !this.showCardDetail

    this.selectedBallades = ballade
    console.log(this.selectedBallades)

    // Construis l'URL embed sans API key
    const query = encodeURIComponent(this.selectedBallades.titre);
    const url = `https://maps.google.com/maps?q=${query}&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    this.balladesService.getBallades().subscribe(
      data => {
        this.ballades = data
        console.log(data)
      });
  }
}
