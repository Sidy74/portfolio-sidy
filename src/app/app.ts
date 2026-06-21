import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavOverlayComponent } from './features/nav-overlay/nav-overlay.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavOverlayComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Portfolio de Sidy Diarra');
  isMenuOpen = signal<boolean>(false);

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }
}
