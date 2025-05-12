import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Ballades } from '../../services/ballades/ballades.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-ballade-detail',
  templateUrl: './ballade-detail.component.html',
  imports: [
    MatCardModule,
    MatIcon,
    NgIf,
    MatIconButton
  ],
  styleUrls: ['./ballade-detail.component.css']
})
export class BalladeDetailComponent implements OnChanges {
  @Input() ballade!: Ballades;
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() toggleFavorite = new EventEmitter<void>();

  mapUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.visible && this.ballade) {
      const query = encodeURIComponent(this.ballade.titre);
      const url = `https://maps.google.com/maps?q=${query}&output=embed`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  onClose() {
    this.close.emit();
  }

  onToggleFavorite() {
    this.toggleFavorite.emit();
  }
}
