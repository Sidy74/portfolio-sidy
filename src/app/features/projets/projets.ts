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

  private autoPlayInterval: ReturnType<typeof setInterval> | undefined;
  private autoPlayEnabled = true;

  // Liste des projets réalisés
  projects: Project[] = [
    {
      id: '03',
      title: 'MeLoger Africa - Plateforme Immobilière',
      category: 'Application Web & Mobile',
      description:
        "Plateforme immobilière permettant de consulter et gérer des annonces de logements. Développement de l'interface web et intégration d'une application mobile avec publication sur Google Play et Apple Store.",
      image: 'project_meloger.svg',
      technologies: ['Angular', 'React Native', 'Django', 'PostgreSQL', 'Google Play Console'],
      liveUrl: 'https://meloger-africa.com',
    },
    {
      id: '01',
      title: 'Refuem-Ma - Plateforme Web',
      category: 'Application Web & Responsive',
      description: `Conception et développement d'une plateforme web moderne et responsive pour Réseau des Femmes Universitaires et Enseignantes du Mali - Ensemble pour l'excellence académique et l'égalité des genres, avec une interface intuitive et adaptée aux différents appareils.`,
      image: 'refuema.png',
      technologies: ['Angular 21', 'Tailwind'],
      liveUrl: 'https://refuema-mali.org/',
      // githubUrl: 'https://github.com/...',
    },
    {
      id: '02',
      title: 'AFIMA - Association des Femmes Ingénieurs du Mali',
      category: 'Site Web & Responsive',
      description:
        "Conception et développement d'une plateforme web moderne et responsive dédiée à l'Association des Femmes Ingénieurs du Mali, avec présentation de l'association, actualités, projets, adhésion, galerie et informations de contact.",
      image: 'Afima.png',
      technologies: ['Angular 21', 'SCSS', 'Responsive Design', 'Lucide Icons'],
      liveUrl: 'https://afimamaali.org/',
      githubUrl: 'https://github.com/...',
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
  ];

  selectedProject = signal<any>(this.projects[0]);

  // Calcul automatique de l'index basé sur le signal
  selectedProjectIndex = computed(() => {
    return this.projects.findIndex((p) => p.id === this.selectedProject().id);
  });

  @ViewChild('projectsList') projectsList!: ElementRef<HTMLDivElement>;

  get displayedProjects() {
    return this.projects.slice(0, 5);
  }
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
  startAutoPlay(): void {
    this.stopAutoPlay();

    this.autoPlayInterval = setInterval(() => {
      if (!this.autoPlayEnabled) {
        return;
      }

      this.nextProject();
    }, 4000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = undefined;
    }
  }

  nextProject(): void {
    if (!this.autoPlayEnabled) {
      return;
    }
    const currentIndex = this.selectedProjectIndex();
    const nextIndex = (currentIndex + 1) % this.displayedProjects.length;
    this.selectedProject.set(this.displayedProjects[nextIndex]);
  }

  // 2. SELECTION MANUELLE (Réinitialise le timer pour le confort utilisateur)
  selectProject(project: Project): void {
    // on désactive définitivement l'autoplay
    this.autoPlayEnabled = false;
    this.stopAutoPlay();
    this.selectedProject.set(project);
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
      const scrollLeftPosition =
        container.scrollLeft +
        (cardRect.left - containerRect.left) -
        containerRect.width / 2 +
        cardRect.width / 2;

      container.scrollTo({
        left: scrollLeftPosition,
        behavior: 'smooth',
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
