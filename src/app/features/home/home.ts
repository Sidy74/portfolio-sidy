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

  downloadCv() {
    // Crée un lien temporaire pour lancer le téléchargement du CV
    const link = document.createElement('a');
    link.href = 'Sidy_Diarra_CV_Professionnel_Minimaliste_Ingénieur_Noir_et_Blanc.pdf'; // Assurez-vous que le fichier est dans src/assets/
    link.download = 'CV_Sidy_Diarra.pdf';
    link.click();
  }

  sendEmail() {
    // Ouvre le client mail par défaut avec ton adresse
    window.location.href = 'mailto:sidydiarra1290@gmail.com?subject=Contact%20depuis%20le%20Portfolio';
  }
}
