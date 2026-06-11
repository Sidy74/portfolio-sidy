import { Component, signal } from '@angular/core';
import { Button } from '../../shared/component/button/button';
import {
  provideLucideIcons,
  LucideHouse,
  LucideDownload,
  LucideSearch,
  LucideLayers,
} from '@lucide/angular';
import { HeroVisualComponent } from './hero-visual/hero-visual.component';
import { NavOverlayComponent } from '../nav-overlay/nav-overlay.component';

@Component({
  selector: 'app-movie-card',
  imports: [Button, HeroVisualComponent, NavOverlayComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  providers: [
    provideLucideIcons(LucideHouse, LucideDownload, LucideSearch, LucideLayers, LucideDownload),
  ],
})
export class MovieCard {
  downloadIcon = LucideDownload;
  isMenuOpen = signal(false);
  activeSlide: number = 1;

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
