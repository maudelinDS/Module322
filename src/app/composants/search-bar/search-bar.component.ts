import {Component, EventEmitter, Output} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [

    FormsModule,

    MatIconButton,
    MatIcon,
    MatToolbarModule,
    NgIf,
  ],
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  @Output() searchChange = new EventEmitter<string>();

  showFilter: boolean = false;
  searchQuery: string = '';

  onSearch(): void {
    this.searchChange.emit(this.searchQuery);
  }
}
