import { Component } from '@angular/core';

interface ParcoursItem {
  date: string;
  status: string;
  level: string;
  title: string;
  institution: string;
  description: string;
  icon: string;
  tags: string[];
}

@Component({
  selector: 'app-parcours',
  imports: [],
  templateUrl: './parcours.html',
  styleUrl: './parcours.scss',
})
export class Parcours {

  /* =====================================================
     FORMATIONS
  ===================================================== */

  formations: ParcoursItem[] = [

    {
      date: '2025 – Présent',
      status: 'En cours',
      level: 'Master',
      title: 'Master en Ingénierie Logicielle',
      institution:
        'Faculté des Sciences et Techniques (FST), Bamako',
      description:
        'Formation en ingénierie logicielle, conception et développement d’applications, architecture logicielle, bases de données et technologies modernes du développement logiciel.',
      icon: 'pi pi-graduation-cap',
      tags: [
        'Génie Logiciel',
        'Architecture',
        'Développement',
        'Bases de données'
      ]
    },

    {
      date: '2021 – 2022',
      status: 'Diplôme obtenu',
      level: 'Licence',
      title: 'Licence en Génie Logiciel',
      institution:
        'Faculté des Sciences et Techniques (FST), Bamako',
      description:
        'Formation en développement logiciel, algorithmique, bases de données, réseaux et systèmes d’information.',
      icon: 'pi pi-graduation-cap',
      tags: [
        'Génie Logiciel',
        'Développement Web',
        'Bases de données',
        'Algorithmique'
      ]
    },

    {
      date: '2017 – 2018',
      status: 'Diplôme obtenu',
      level: 'Baccalauréat',
      title: 'Baccalauréat Malien TSE',
      institution:
        'Lycée Kalilou Fofana de Bougouni',
      description:
        'Obtention du Baccalauréat Malien, série TSE.',
      icon: 'pi pi-book',
      tags: [
        'TSE',
        'Baccalauréat'
      ]
    }

  ];


  /* =====================================================
     EXPÉRIENCES PROFESSIONNELLES
  ===================================================== */

  experiences: ParcoursItem[] = [

    {
      date: 'Avril – Mai 2025',
      status: 'Stage',
      level: 'Développement',
      title: 'Stagiaire Développeur',
      institution:
        'Orange Mali – Bamako',
      description:
        'Développement d’une application web de pharmacie de garde avec Angular et Spring Boot (Back-office). Développement des fonctionnalités backend en Java/Kotlin, intégration d’API REST et de services utilisés par Max it Orange Mali.',
      icon: 'pi pi-briefcase',
      tags: [
        'Angular',
        'Spring Boot',
        'Java',
        'Kotlin',
        'API REST',
        'PostgreSQL'
      ]
    },

    {
      date: '2022 – 2023',
      status: 'Stage',
      level: 'Gestion de projet',
      title: 'Stagiaire / Assistant Projet',
      institution:
        'Wassa Technologie – Bamako',
      description:
        'Participation au suivi et à la coordination de projets selon Agile/Scrum. Suivi des tâches, participation aux réunions de projet et utilisation d’outils collaboratifs.',
      icon: 'pi pi-briefcase',
      tags: [
        'Agile / Scrum',
        'Trello',
        'Jira',
        'Git',
        'Notion',
        'WordPress'
      ]
    },

    {
      date: '2022 – Présent',
      status: 'En cours',
      level: 'Support informatique',
      title: 'Maintenance et Support Informatique',
      institution:
        'Univers Informatique – Bamako',
      description:
        'Maintenance et préparation de matériels et logiciels informatiques. Diagnostic et résolution d’incidents, installation et configuration de Windows, Linux et macOS, ainsi qu’assistance technique.',
      icon: 'pi pi-desktop',
      tags: [
        'Maintenance',
        'Support IT',
        'Windows',
        'Linux',
        'macOS',
        'Diagnostic'
      ]
    }

  ];
}