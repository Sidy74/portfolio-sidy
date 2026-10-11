import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './features/navbar/navbar';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Portfolio de Sidy Diarra');
  isMenuOpen = signal<boolean>(false);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  private router = inject(Router);

  constructor() {
    // Envoie l'événement de changement de page à Google Analytics
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (typeof gtag === 'function') {
        gtag('config', 'G-T8CDFRGD83', {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }
  ngOnInit(): void {
    // 1. Le titre principal de ton portfolio (Visible dans l'onglet et sur Google)
    this.titleService.setTitle(
      'Sidy Diarra | Ingénieur Logiciel, Développeur Full-Stack & UI/UX Designer',
    );

    // 2. La description globale pour cibler tes métiers et compétences
    this.metaService.updateTag({
      name: 'description',
      content:
        'Portfolio officiel de Sidy Diarra, Ingénieur Logiciel et Développeur Full-Stack (Angular, Django, Spring Boot), UI/UX Designer, expert en administration de bases de données et maintenance informatique à Bamako.',
    });

    // 3. Les mots-clés (Keywords) pour aider les moteurs de recherche
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Sidy Diarra, Sidy, Diarra, Ingénieur Logiciel, Software Engineer, Développeur Full-Stack, UI/UX Designer, Angular, Django, Spring Boot, Maintenance informatique, Bamako, Mali',
    });

    // 4. Balises Open Graph (pour que ton profil s'affiche super bien sur LinkedIn, WhatsApp, etc.)
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Sidy Diarra | Software Engineer & UI/UX Designer',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Découvrez les projets, expertises et services en ingénierie logicielle de Sidy Diarra.',
    });
    this.metaService.updateTag({ property: 'og:type', content: 'profile' });
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }
}
