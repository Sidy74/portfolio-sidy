import { Component, input, output } from '@angular/core';
import { Home, LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-button',
  imports: [LucideAngularModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  label = input.required<string>();
  // Ajout du type 'primary-double' pour ton bouton CV
  type = input<'primary' | 'primary-double' | 'outline'>('primary');

  iconName = input<LucideIconData | undefined>(undefined);
  disabled = input<boolean>(false);

  btnClick = output<void>();

  onClick() {
    this.btnClick.emit();
  }
}
