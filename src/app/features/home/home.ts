import { Component } from '@angular/core';
import { Button } from '../../shared/component/button/button';
import { LucideDownload, provideLucideIcons } from '@lucide/angular';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  providers: [provideLucideIcons(LucideDownload)],
})
export class Home {
  downloadIcon = 'download';
}
