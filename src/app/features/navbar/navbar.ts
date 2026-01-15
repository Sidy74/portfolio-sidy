import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Briefcase, Github, Home, Linkedin, LucideAngularModule, Mail } from "lucide-angular";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly github = Github;
  readonly linkedin = Linkedin;
  menuItems = signal([
    { label: 'Accueil', path: '/',icon: Home  },
    { label: 'Projets', path: '/projets', icon: Briefcase },
    { label: 'Contact', path: '/contact', icon: Mail },
  ]);
}
