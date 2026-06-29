import {
  Component,
  signal,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  HostListener,
  inject,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error';
  isTyping?: boolean;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './terminal.html',
  styleUrls: ['./terminal.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TerminalComponent implements AfterViewChecked {
  @ViewChild('terminalBody') private terminalBody!: ElementRef;
  @ViewChild('terminalInput') private terminalInput!: ElementRef;

  private document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  isOpen = signal<boolean>(false);
  currentInput = signal<string>('');
  isSystemTyping = signal<boolean>(false);

  history = signal<TerminalLine[]>([
    { text: "Bienvenue. Tapez 'help' pour voir les commandes disponibles.", type: 'output' },
  ]);

  private commands: Record<string, string> = {
    help: 'Commandes disponibles : about, skills, projects, contact, clear, close, help',
    about: 'Sidy Diarra - Full Stack Software Engineer & UI/UX Designer.',
    skills:
      '■ Frontend : Angular 21, TypeScript, Tailwind CSS\n■ Backend : Node.js, Express, NestJS, Django, PostgreSQL\n■ Mobile : Flutter, React Native',
    projects: "Meloger Africa, Smizo, Transit Landing... Tapez 'projects' pour voir la liste.",
    contact: 'Email: sidydev0@gmail.com\nGitHub: github.com/abdoulxx',
  };

  openTerminal() {
    this.isOpen.set(true);
    this.renderer.appendChild(this.document.body, this.elementRef.nativeElement);
    setTimeout(() => this.terminalInput?.nativeElement.focus(), 60);
  }

  closeTerminal() {
    this.isOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  handleEscape() {
    if (this.isOpen()) this.closeTerminal();
  }

  focusInput(): void {
    if (this.terminalInput && !this.isSystemTyping()) {
      this.terminalInput.nativeElement.focus();
    }
  }

  handleCommand(event: Event) {
    event.preventDefault();
    if (this.isSystemTyping()) return;

    const input = this.currentInput().trim().toLowerCase();
    if (!input) return;

    this.history.update((h) => [
      ...h,
      { text: `visiteur@sidy.dev:~$ ${this.currentInput()}`, type: 'input' },
    ]);
    this.currentInput.set('');

    if (input === 'exit' || input === 'close') {
      this.closeTerminal();
      return;
    }

    if (input === 'clear') {
      this.history.set([]);
    } else if (this.commands[input]) {
      this.typeEffect(this.commands[input]);
    } else {
      this.history.update((h) => [
        ...h,
        {
          text: `Commande non trouvée. Tapez 'help' pour voir les commandes disponibles.`,
          type: 'error',
        },
      ]);
    }
  }

  private typeEffect(fullText: string) {
    this.isSystemTyping.set(true);
    const targetIndex = this.history().length;
    this.history.update((h) => [...h, { text: '', type: 'output', isTyping: true }]);

    let currentText = '';
    let characterIndex = 0;

    const interval = setInterval(() => {
      if (characterIndex < fullText.length) {
        currentText += fullText[characterIndex];
        this.history.update((h) => {
          const updated = [...h];
          updated[targetIndex] = { ...updated[targetIndex], text: currentText };
          return updated;
        });
        characterIndex++;
      } else {
        clearInterval(interval);
        this.history.update((h) => {
          const updated = [...h];
          updated[targetIndex].isTyping = false;
          return updated;
        });
        this.isSystemTyping.set(false);
      }
    }, 12);
  }

  ngAfterViewChecked() {
    if (this.isOpen()) this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.terminalBody.nativeElement.scrollTop = this.terminalBody.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
