import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
// Import du composant de rendu et des icônes génériques encore existantes
import {
  LucideIcon,
  provideLucideIcons,
  LucideHome,
  LucideBriefcase,
  LucideMail,
  LucideDynamicIcon,
  LucideDownload,
} from '@lucide/angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  // Injection locale des icônes utilisées dans le menu
  providers: [provideLucideIcons(LucideHome, LucideBriefcase, LucideMail, LucideDownload)],
})
export class Navbar {
  // Déclaration du tableau de navigation sous forme de Signal
  menuItems = signal([
    { label: 'Accueil', path: '/', icon: 'home' },
    { label: 'Projets', path: '/projets', icon: 'briefcase' },
    { label: 'Contact', path: '/contact', icon: 'mail' },
  ]);

  readonly icons = { LucideHome, LucideBriefcase, LucideMail, LucideDownload };

  isOpen = signal(false);

  toggleMenu() {
    this.isOpen.update((value) => !value);
  }

  closeMenu() {
    this.isOpen.set(false);
  }
}
