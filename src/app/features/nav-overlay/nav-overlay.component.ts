import { Component, input, output } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-overlay',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-overlay.component.html',
  styleUrls: ['./nav-overlay.component.scss']
})
export class NavOverlayComponent {
  // Signal Inputs & Outputs (Syntaxe moderne Angular)
  isOpen = input<boolean>(false);
  closeMenu = output<void>();

  // Ta liste d'items de navigation pour centraliser les routes
  navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Projets', path: '/projets' },
    { label: 'Compétences', path: '/competences' },
    { label: 'À propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' }
  ];

  onItemClick(): void {
    this.closeMenu.emit(); // Ferme l'overlay lors d'un clic sur un lien
  }
}