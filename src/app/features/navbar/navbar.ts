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
} from '@lucide/angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // Ajout de LucideIcon pour pouvoir lire la balise <lucide-icon> dans le HTML
  imports: [RouterLink, RouterLinkActive, LucideDynamicIcon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  // Injection locale des icônes utilisées dans le menu
  providers: [provideLucideIcons(LucideHome, LucideBriefcase, LucideMail)],
})
export class Navbar {
  // Déclaration du tableau de navigation sous forme de Signal
  menuItems = signal([
    { label: 'Accueil', path: '/', icon: 'home' },
    { label: 'Projets', path: '/projets', icon: 'briefcase' },
    { label: 'Contact', path: '/contact', icon: 'mail' },
  ]);
}
