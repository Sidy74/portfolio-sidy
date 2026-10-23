import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { MovieCard } from './features/test/movie-card.component';
export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Sidy Diarra | Ingénieur Logiciel & Designer UI/UX',
  },
  {
    path: 'services',
    loadComponent: () => import('./features/my-services/my-services').then((m) => m.MyServices),
    title: 'Mes Services | Sidy Diarra',
  },
  {
    path: 'parcours',
    loadComponent: () => import('./features/parcours/parcours').then((m) => m.Parcours),
    title: 'Parcours | Sidy Diarra',
  },

  {
    path: 'projets',
    loadComponent: () => import('./features/projets/projets').then((m) => m.Projets),
    title: 'Mes Projets | Sidy Diarra',
  },
  {
    path: 'competences',
    loadComponent: () => import('./features/competences/competences').then((m) => m.Competences),
    title: 'Compétences | Sidy Diarra',
  },
  {
    path: 'a-propos',
    loadComponent: () => import('./features/a-propos/a-propos').then((m) => m.APropos),
    title: 'À Propos | Sidy Diarra',
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    title: 'Contact | Sidy Diarra',
  },
  // Redirection vers l'accueil si l'utilisateur tape une URL inexistante
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
