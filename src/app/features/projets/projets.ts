import { Component, computed, effect, ElementRef, input, signal, ViewChild } from '@angular/core';
import { Button } from '../../shared/component/button/button';
import { provideLucideIcons, LucideExternalLink, LucideFolderGit2 } from '@lucide/angular';

export type HeroLayoutType = 'home' | 'projects';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-projets',
  imports: [Button],
  templateUrl: './projets.html',
  styleUrl: './projets.scss',
  providers: [provideLucideIcons(LucideExternalLink, LucideFolderGit2)],
})
export class Projets {
  externalLink = LucideExternalLink;
  lucideFolderGit2 = LucideFolderGit2;
  // Liste des projets réalisés
  projects: Project[] = [
    {
      id: '01',
      title: 'Transit - Plateforme Logistique',
      category: 'Application Web & Responsive',
      description:
        "Conception d'une interface de suivi logistique multi-étapes avec un design fluide et une optimisation mobile avancée.",
      image: 'photo-sidy2.jpg',
      technologies: ['Angular 21', 'SCSS', 'Leaflet', 'Lucide Icons'],
      liveUrl: 'https://...',
      githubUrl: 'https://...',
    },
    {
      id: '02',
      title: 'Smizo - Escrow Marketing',
      category: 'Architecture Web & API',
      description:
        "Plateforme de mise en relation d'influenceurs dotée d'un système de tiers de confiance (escrow) par tokens pour sécuriser les transactions.",
      image: 'photo-sidy.jpg',
      technologies: ['Django', 'Angular', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://...',
    },
    {
      id: '05',
      title: 'Smizo - Escrow Marketing',
      category: 'Architecture Web & API',
      description:
        "Plateforme de mise en relation d'influenceurs dotée d'un système de tiers de confiance (escrow) par tokens pour sécuriser les transactions.",
      image: 'photo-sidy1.jpg',
      technologies: ['Django', 'Angular', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://...',
    },
    {
      id: '04',
      title: 'Smizo - Escrow Marketing',
      category: 'Architecture Web & API',
      description:
        "Plateforme de mise en relation d'influenceurs dotée d'un système de tiers de confiance (escrow) par tokens pour sécuriser les transactions.",
      image: 'assets/images/smizo.jpg',
      technologies: ['Django', 'Angular', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://...',
    },
    {
      id: '03',
      title: 'Meloger - Solution Immobilière',
      category: 'Application Mobile',
      description:
        "Déploiement et mise à jour d'une application mobile sur le Play Store, répondant aux dernières exigences des API Android.",
      image: 'assets/images/meloger.jpg',
      technologies: ['React Native', 'Redux', 'Node.js', 'Google Play Console'],
      githubUrl: 'https://...',
    },
  ];

  selectedProject = signal<any>(this.projects[0]);
  private autoPlayInterval: any;

  // Calcul automatique de l'index basé sur le signal
  selectedProjectIndex = computed(() => {
    return this.projects.findIndex(p => p.id === this.selectedProject().id);
  });

  @ViewChild('projectsList') projectsList!: ElementRef<HTMLDivElement>;

  constructor() {
    // Déclenche le scroll horizontal dès que le projet sélectionné change (clic ou auto-play)
    effect(() => {
      const index = this.selectedProjectIndex();
      if (this.projectsList) {
        this.scrollToActiveCard(index);
      }
    });
  }

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  // 1. GESTION DU TIMER AUTOMATIQUE
  startAutoPlay() {
    this.stopAutoPlay(); // Sécurité : évite de dupliquer des timers
    this.autoPlayInterval = setInterval(() => {
      this.nextProject();
    }, 4000); // Alterne toutes les 4 secondes
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextProject() {
    const currentIndex = this.selectedProjectIndex();
    const nextIndex = (currentIndex + 1) % this.projects.length; // Boucle à l'infini
    this.selectedProject.set(this.projects[nextIndex]);
  }

  // 2. SELECTION MANUELLE (Réinitialise le timer pour le confort utilisateur)
  selectProject(project: any) {
    this.selectedProject.set(project);
    this.startAutoPlay(); // Relance le compteur à zéro pour ne pas skipper juste après un clic
  }

  // 3. FONCTION DE SCROLL ULTRA-PRÉCISE
  scrollToActiveCard(index: number) {
    if (!this.projectsList) return;

    const container = this.projectsList.nativeElement;
    const cards = container.querySelectorAll('.project-card');
    
    if (cards && cards[index]) {
      const activeCard = cards[index] as HTMLElement;
      
      const containerRect = container.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();

      // Calcule la position horizontale parfaite
      const scrollLeftPosition = container.scrollLeft + (cardRect.left - containerRect.left) - (containerRect.width / 2) + (cardRect.width / 2);

      container.scrollTo({
        left: scrollLeftPosition,
        behavior: 'smooth'
      });
    }
  }

  openExternalLink(url: string | undefined): void {
    if (url) window.open(url, '_blank', 'noopener, noreferrer');
  }

  handleButtonClick(event: any, url: string | undefined): void {
    event.stopPropagation();
    if (url) this.openExternalLink(url);
  }
}