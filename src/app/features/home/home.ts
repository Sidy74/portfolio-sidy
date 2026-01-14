import { Component } from '@angular/core';
import { Button } from '../../shared/component/button/button';
import { Download } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly downloadIcon = Download;
}
