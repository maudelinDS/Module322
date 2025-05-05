import { Component } from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    MatOption,
    NgForOf,
    MatIconButton,
    MatIcon,
    NgIf,
    MatToolbarModule,
  ],
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  // ✅ Ajoute cette variable
  showFilter: boolean = false;

  // Exemple de données à filtrer
  categories: string[] = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3'];

  searchQuery: string = '';
  selectedCategory: string = '';

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  allData: any[] = [
    { name: 'Item 1', category: 'Catégorie 1' },
    { name: 'Item 2', category: 'Catégorie 2' },
    { name: 'Item 3', category: 'Catégorie 1' },
    { name: 'Item 4', category: 'Catégorie 3' }
  ];

  constructor() {
    this.dataSource.data = this.allData;
  }

  onSearch(): void {
    this.filterData();
  }

  onFilterChange(): void {
    this.filterData();
  }

  filterData(): void {
    const filteredData = this.allData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory ? item.category === this.selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
    this.dataSource.data = filteredData;
  }
}
