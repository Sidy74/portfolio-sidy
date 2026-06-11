import { Routes } from '@angular/router';
import { Home } from './features/home/home';
export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Sidy Diarra | Ingénieur Logiciel & Designer UI/UX', 
  },
  {
    path: 'projets',
    loadComponent: () =>
      import('./features/projets/projets').then((m) => m.Projets),
    title: 'Mes Projets | Sidy Diarra',
  },
  {
    path: 'competences',
    loadComponent: () =>
      import('./features/competences/competences').then((m) => m.Competences),
    title: 'Compétences | Sidy Diarra',
  },
  {
    path: 'a-propos',
    loadComponent: () =>
      import('./features/a-propos/a-propos').then((m) => m.APropos),
    title: 'À Propos | Sidy Diarra',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact').then((m) => m.Contact),
    title: 'Contact | Sidy Diarra',
  },
  // Redirection vers l'accueil si l'utilisateur tape une URL inexistante
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
