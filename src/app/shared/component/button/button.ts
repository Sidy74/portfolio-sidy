import { Component, input, output } from '@angular/core';
import {
  LucideHouse,
  provideLucideIcons,
  LucideDynamicIcon,
  LucideIconData,
  LucideIconInput,
} from '@lucide/angular';

@Component({
  selector: 'app-button',
  imports: [LucideDynamicIcon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  providers: [provideLucideIcons(LucideHouse)],
})
export class Button {
  label = input.required<string>();
  // Ajout du type 'primary-double' pour ton bouton CV
  type = input<'primary' | 'primary-double' | 'outline'>('primary');

  iconName = input<LucideIconInput | null>(null);
  disabled = input<boolean>(false);

  btnClick = output<void>();

  onClick() {
    this.btnClick.emit();
  }
}
