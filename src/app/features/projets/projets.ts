import { Component, computed, input } from '@angular/core';

export type HeroLayoutType = 'home' | 'projects';

@Component({
  selector: 'app-projets',
  imports: [],
  templateUrl: './projets.html',
  styleUrl: './projets.scss',
})
export class Projets {
type = input<HeroLayoutType>('home');

isProjectsLayout = computed(() => this.type() === 'projects');
}
