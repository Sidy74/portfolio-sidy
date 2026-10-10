import { Component } from '@angular/core';
import { Button } from '../../shared/component/button/button';
import { LucideDownload, LucideSend, provideLucideIcons } from '@lucide/angular';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  providers: [provideLucideIcons(LucideDownload,LucideSend)],
})
export class Home {
  downloadIcon = LucideDownload;
  sendIcon= LucideSend;
}
