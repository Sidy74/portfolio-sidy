import { Component } from '@angular/core';
import {
  LucideCode2,
  LucideDatabase,
  LucideDynamicIcon,
  LucideFolderKanban,
  LucideLayout,
  LucideShoppingBag,
  LucideSmartphone,
  LucideWrench,
} from '@lucide/angular';

export interface Service {
  id: string;
  title: string;
  description: string;
  skills: string[];
  icon: any; // Composant d'icône Lucide
}

@Component({
  selector: 'app-my-services',
  imports: [LucideDynamicIcon],
  templateUrl: './my-services.html',
  styleUrl: './my-services.scss',
})
export class MyServices {
  services: Service[] = [
    {
      id: 'fullstack',
      title: 'Développement Full-Stack',
      description:
        "Conception et développement d'applications web et d'APIs REST performantes, sécurisées et évolutives.",
      skills: ['Angular', 'Django', 'Spring Boot', 'REST API'],
      icon: LucideCode2,
    },
    {
      id: 'project-management',
      title: 'Gestion de Projet IT',
      description:
        'Planification, suivi Agile/Scrum, rédaction des spécifications fonctionnelles et coordination des équipes techniques.',
      skills: ['Agile / Scrum', 'Jira', 'Cahier des charges', 'UML / Merise'],
      icon: LucideFolderKanban,
    },
    {
      id: 'database-admin',
      title: 'Administration de Bases de Données',
      description:
        'Conception de schémas relationnels, optimisation des requêtes SQL, modélisation des données et maintenance des bases.',
      skills: ['PostgreSQL', 'Modélisation SQL', 'Optimisation', 'Sauvegardes'],
      icon: LucideDatabase,
    },
    {
      id: 'uiux',
      title: 'UI/UX Design & Prototypage',
      description:
        "Création d'interfaces utilisateur modernes, ergonomiques et captivantes avec prototypes interactifs.",
      skills: ['Figma', 'Wireframing', 'Prototypage', 'Design System'],
      icon: LucideLayout,
    },
    {
      id: 'maintenance',
      title: 'Maintenance Matériel & Logiciel',
      description:
        "Diagnostic, réparation matériel (laptop/desktop), installation de systèmes d'exploitation et dépannage logiciel.",
      skills: ['Ubuntu / Linux', 'Windows', 'Diagnostic Hardware', 'Dépannage OS'],
      icon: LucideWrench,
    },
    {
      id: 'sales',
      title: 'Vente de Matériel Informatique',
      description:
        "Fourniture et conseil pour l'achat d'équipements informatiques, ordinateurs portables, accessoires et composants récents.",
      skills: ["Conseil d'achat", 'Laptops & PC', 'Accessoires IT', 'Configuration'],
      icon: LucideShoppingBag,
    },
  ];
}
