import {Component, OnInit} from '@angular/core';
import {CardBalladeComponent} from '../../composants/card-ballade/card-ballade.component';
import {ListBalladesComponent} from '../../composants/list-ballades/list-ballades.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';
import {NgForOf, NgIf} from '@angular/common';
import {SearchBarComponent} from '../../composants/search-bar/search-bar.component';
import {Ballades, BalladesService} from '../../services/ballades/ballades.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {MatIcon} from '@angular/material/icon';
import {Filtres, FiltresService} from '../../services/filtres/filtres.service';
import {BalladeDetailComponent} from '../../composants/ballade-detail/ballade-detail.component';

@Component({
  selector: 'app-favoris',
  imports: [
    CardBalladeComponent,
    ListBalladesComponent,

    NgForOf,
    NgIf,
    SearchBarComponent,
    BalladeDetailComponent,
    MatIcon,
  ],
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.css'
})
export class FavorisComponent implements  OnInit{
  filtres: Filtres[] = [];

  favoris: Ballades[] = [];
  filteredFavoris: Ballades[] = [];
  showCardDetail = false;
  selectedBallades!: Ballades;
  mapUrl!: SafeResourceUrl;
  isLoading: boolean = false
  currentQuery: string = '';
  currentFilters: Record<string, any> = {};
  showOverlay = false;
  overlayMessage = '';

  constructor(
    private balladesService: BalladesService,
    private filterService: FiltresService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {

    this.getFavorisBallades()
    this.getFilters()
  }

  showBalladeDetail(ballade: Ballades) {
    this.selectedBallades = ballade;
    this.showCardDetail = true;

    const query = encodeURIComponent(ballade.titre);
    const url = `https://maps.google.com/maps?q=${query}&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  get otherBallades(): Ballades[] {
    return this.favoris.filter(b => b.id !== this.selectedBallades?.id);
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
        this.getFavorisBallades()
        this.getFilters()
        this.otherBallades

      });

  }
  getFilters() {
    this.isLoading = true

    this.filterService.getFiltres().subscribe((data: Filtres[]) => {
      this.filtres = data;
      this.isLoading = false
    });
  }
  getFavorisBallades() {
    this.isLoading = true

    this.balladesService.getFavoriteBallades().subscribe((data: Ballades[]) => {
      // Ne garde que ceux à `favoris === true`
      this.favoris = data;
      this.filteredFavoris = data; // initialement tout
      this.isLoading = false

    });
  }
  onSearchChanged(query: string) {
    const lowerQuery = query.toLowerCase();
    this.filteredFavoris = this.favoris.filter(b =>
      b.titre.toLowerCase().includes(lowerQuery) ||
      b.description.toLowerCase().includes(lowerQuery)
    );
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
// AcceuilComponent.ts

  private applySearchAndFilters() {
    // 1. on part de la liste complète
    let result = [...this.favoris];

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
    this.filteredFavoris = result;
  }


}
