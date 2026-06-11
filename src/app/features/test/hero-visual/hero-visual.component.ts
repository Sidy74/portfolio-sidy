import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  EventEmitter,
  Output,
  signal,
  computed,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Button } from '../../../shared/component/button/button';

@Component({
  selector: 'app-hero-visual',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './hero-visual.component.html',
  styleUrls: ['./hero-visual.component.scss'],
})
export class HeroVisualComponent implements OnInit, OnDestroy {
  currentSlide = signal<number>(0);

  autoplayInterval: any;

  @Output() slideChanged = new EventEmitter<number>();

  slides = [
    {
      title: 'Sidy Diarra',
      subtitle: 'Ingénieur Logiciel Full Stack',
      synopsis:
        "Spécialisé dans la conception d'architectures robustes et scalables. J'intègre le frontend et le backend avec une approche DevOps pour des applications hautement performantes.",
      icon: 'layers',
      btnText: 'Voir les projets',
      bgImage: 'photo-sidy1.jpg',
      profileImg: 'photo-sidy1.jpg',
      tags: [
        { text: '2026' },
        { text: 'DISPO', isStatus: true },
        { text: 'Angular / Django' },
        { text: 'Docker' },
      ],
      details: [
        'Architecture MVC & API RESTful',
        'Conteneurisation Docker',
        'Gestion de bases de données',
      ],
    },
    {
      title: 'Creative Design',
      subtitle: 'UI/UX Designer',
      synopsis:
        "Passionné par l'esthétique minimaliste et les structures ergonomiques. Je transforme des problématiques complexes en interfaces claires, fluides et mémorables.",
      icon: 'palette',
      btnText: 'Découvrir le design',
      bgImage: 'hero-sidy.svg',
      profileImg: 'hero-sidy.svg',
      tags: [
        { text: 'Figma' },
        { text: 'Bento Grid', isStatus: true },
        { text: 'Prototypage' },
        { text: 'UI/UX' },
      ],
      details: [
        'Design Systems scalables',
        'Mises en page Bento Layout',
        'Prototypes haute fidélité',
      ],
    },
    {
      title: 'Mobile Innovation',
      subtitle: 'Développeur Mobile Cross-Platform',
      synopsis:
        "Développement d'applications mobiles réactives et performantes. Je veille à offrir une expérience utilisateur fluide et native sur iOS et Android.",
      icon: 'smartphone',
      btnText: 'Explorer les applications',
      bgImage: 'photo-sidy.jpg',
      profileImg: 'photo-sidy.jpg',
      tags: [
        { text: 'React Native' },
        { text: 'Mobile First', isStatus: true },
        { text: 'iOS / Android' },
      ],
      details: [
        'Applications cross-platform',
        "Intégration d'APIs temps réel",
        'Fluidité et gestes natifs',
      ],
    },
  ];

  // Optionnel : Un signal calculé (computed) pour générer dynamiquement la chaîne CSS de la transition
  transformStyle = computed(() => `translateX(-${this.currentSlide() * 100}%)`);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
    }
  }

  startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayInterval = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      window.clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  nextSlide(): void {
    // .set() met à jour la valeur et notifie automatiquement le template
    this.currentSlide.set((this.currentSlide() + 1) % this.slides.length);
    this.slideChanged.emit(this.currentSlide());
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.slideChanged.emit(this.currentSlide());
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }
}
