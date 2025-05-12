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
    currentQuery: string = '';
    currentFilters: Record<string, any> = {};
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


  // AcceuilComponent.ts
    handleSearch(query: string) {
      this.currentQuery = query.toLowerCase().trim();
      this.applySearchAndFilters();
    }

    handleFilters(filters: Record<string, any>) {
      this.currentFilters = filters;
      this.applySearchAndFilters();
    }
// AcceuilComponent.ts

    private applySearchAndFilters() {
      // 1. on part de la liste complète
      let result = [...this.ballades];

      // 2. recherche texte (titre + description)
      if (this.currentQuery) {
        result = result.filter(b =>
          b.titre.toLowerCase().includes(this.currentQuery) ||
          b.description.toLowerCase().includes(this.currentQuery)
        );
      }

      // 3. filtrage par ID de filtre
      // currentFilters est de la forme { "3": "3", "4": "4", ... }
      const activeFilterIds = Object.values(this.currentFilters)
        .filter(v => v != null && v !== '')
        .map(v => Number(v));

      if (activeFilterIds.length) {
        result = result.filter(b =>
          activeFilterIds.includes(b.filter_id)
        );
      }

      // 4. on met à jour
      this.filteredBallades = result;
    }


  }
