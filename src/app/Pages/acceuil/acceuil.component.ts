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

  getFilters() {
    this.isLoading = true
    this.filterService.getFiltres().subscribe((data: Filtres[]) => {
      this.filtres = data;
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
      });

  }


  onSearchChanged(query: string) {
    const lowerQuery = query.toLowerCase();
    this.filteredBallades = this.ballades.filter(b =>
      (b.titre.toLowerCase().includes(lowerQuery) || b.description.toLowerCase().includes(lowerQuery)) &&
      (this.selectedFilterId === '' || b.filter_id === +this.selectedFilterId)
    );
  }

  onFilterChanged(filterId: string) {
    this.selectedFilterId = filterId;
    this.onSearchChanged(''); // ou garde la dernière requête de recherche si tu veux combiner
  }

}
