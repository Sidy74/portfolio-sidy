import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-terminal-trigger',
  standalone: true,
  imports: [],
  template: `<div class="terminal-floating-container">
    <div class="glow-line-decoration"></div>

    <button class="terminal-trigger-btn" (click)="onButtonClick()" aria-label="Ouvrir le terminal">
      <div class="pulse-ring"></div>
      <div class="btn-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="terminal-icon-svg"
        >
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
      </div>
    </button>
  </div>`,
  styles: [
    `
      @use '../../scss/variables' as *;
      .terminal-floating-container {
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
      }

      .terminal-trigger-btn {
        position: relative;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 1rem; // Coins arrondis premium style Bento
        background-color: $surface-card; // Ton violet sombre #120d1d
        border: 1px solid rgba($accent-soft, 0.15);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow:
          0 10px 25px -5px rgba($bg-dark, 0.6),
          0 0 0 1px rgba($accent-vivid, 0.05);
        transition: $transition-smooth;
        overflow: visible;

        .btn-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .terminal-icon-svg {
          width: 1.5rem;
          height: 1.5rem;
          color: $color-orange-mid;
          transition: $transition-smooth;
        }

        // Anneau de pulsation lumineux (effet Halo vert/violet de ton UI)
        .pulse-ring {
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          border: 1px solid rgba(#2ea043, 0.4);
          animation: triggerPulse 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
          z-index: 1;
          pointer-events: none;
        }

        // --- ÉTATS INTERACTIFS ---
        &:hover {
          border-color: rgba($accent-soft, 0.4);
          transform: translateY(-3px);
          box-shadow:
            0 15px 30px -5px rgba($bg-dark, 0.8),
            0 0 15px 2px rgba($accent-vivid, 0.15);

          .terminal-icon-svg {
            color: $text-white;
            transform: scale(1.05);
          }
        }

        &:active {
          transform: translateY(-1px) scale(0.95);
        }
      }

      // Animation de l'onde de choc circulaire
      @keyframes triggerPulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(1.4);
          opacity: 0;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TerminalTriggerComponent {
  @Output() open = new EventEmitter<void>();

  onButtonClick(): void {
    this.open.emit();
  }
}
