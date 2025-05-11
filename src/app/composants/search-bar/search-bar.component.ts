import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  imports: [FormsModule, MatIconButton, MatIcon, MatToolbarModule, NgIf, NgForOf, NgClass],
  standalone: true,
})
export class SearchBarComponent {
  @Input() filters: any[] = []; // tableau dynamique fourni par le parent
  @Output() filterChange = new EventEmitter<Record<string, any>>();
  @Output() searchChange = new EventEmitter<string>();

  showFilter: boolean = false;
  searchQuery: string = '';

  onSearch() {
    this.searchChange.emit(this.searchQuery);
    this.applyFilters();
  }

  // Lorsque l'utilisateur clique sur un filtre
  selectFilter(filter: any) {
    filter.value = (filter.value === filter.id) ? null : filter.id; // Toggle le filtre
    this.applyFilters();
  }

  // Appliquer les filtres actifs
  applyFilters() {
    const activeFilters = this.filters.reduce((acc, f) => {
      if (f.value) acc[f.id] = f.value; // Ajouter le filtre actif
      return acc;
    }, {} as Record<string, any>);
    this.filterChange.emit(activeFilters); // Émettre les filtres actifs
  }
}
