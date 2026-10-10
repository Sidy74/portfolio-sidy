import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './features/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  Navbar],
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
