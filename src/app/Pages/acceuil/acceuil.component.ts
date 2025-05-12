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
import {Filtres, FiltresService} from '../../services/filtres/filtres.service';
import {BalladeDetailComponent} from '../../composants/ballade-detail/ballade-detail.component';

@Component({
  selector: 'app-acceuil',
  imports: [
    SearchBarComponent,
    CardBalladeComponent,
    NgForOf,
    NgIf,
    MatIcon,
    ListBalladesComponent,
    MatCardModule,
    BalladeDetailComponent
  ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {

  showOverlay = false;
  overlayMessage = '';
  ballades: Ballades[] = [];
  filtres: Filtres[] = [];
  filteredBallades: Ballades[] = [];
  showCardDetail = false;
  selectedBallades!: Ballades;
  mapUrl!: SafeResourceUrl;
  selectedFilterId: string = '';
  isLoading: boolean = false

  constructor(
    private balladesService: BalladesService,
    private filterService: FiltresService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {

    this.getFilters()
    this.getBallades()
  }

  myFilters = [
    {key: 'genre', label: 'Genre', type: 'select', options: ['Rock', 'Jazz'], value: ''},
    {key: 'auteur', label: 'Auteur', type: 'text', value: ''},
    {key: 'date', label: 'Date', type: 'date', value: ''}
  ];

  getFilters() {
    this.isLoading = true
    this.filterService.getFiltres().subscribe((data: Filtres[]) => {
      this.filtres = data;
      console.log(data)
      this.isLoading = false

    });
  }

  getBallades() {
    this.isLoading = true
    this.balladesService.getBallades().subscribe((data: Ballades[]) => {
      this.ballades = data;
      this.filteredBallades = data
      this.isLoading = false
    });
  }

  showBalladeDetail(ballade: Ballades) {
    this.selectedBallades = ballade;
    this.showCardDetail = true;

    const query = encodeURIComponent(ballade.titre);
    const url = `https://maps.google.com/maps?q=${query}&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    window.scrollTo({top: 0, behavior: 'smooth'});

  }

  get otherBallades(): Ballades[] {
    return this.ballades.filter(b => b.id !== this.selectedBallades?.id);
  }

  // inverse le statut favoris et met à jour via le service
  toggleFavorite() {
    // inverse localement
    this.selectedBallades.favoris = !this.selectedBallades.favoris;

    // Envoie l'objet complet à l'API
    this.balladesService
      .updateBalladeFull(this.selectedBallades)
      .subscribe(updated => {
        this.selectedBallades = updated;

        // Affiche le message
        const action = this.selectedBallades.favoris ? 'ajouté aux favoris' : 'supprimé des favoris';
        this.showTemporaryOverlay(`Votre balade a été
 ${action}`);
      });
  }

  /** Affiche un overlay avec le message donné pendant 3 s */
  private showTemporaryOverlay(msg: string) {
    this.overlayMessage = msg;
    this.showOverlay = true;
    setTimeout(() => {
      this.showOverlay = false;
    }, 1500);
  }


  handleSearch(query: string) {
    console.log('Recherche :', query);
  }

  handleFilters(filters: Record<string, any>) {
    console.log('Filtres reçus du composant enfant :', filters);
  }

}
