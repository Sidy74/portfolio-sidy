import { Component, signal } from '@angular/core';
import { MovieCard } from "./features/test/movie-card.component";

@Component({
  selector: 'app-root',
  imports: [MovieCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Portfolio de Sidy Diarra');
}
