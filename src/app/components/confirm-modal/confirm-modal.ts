import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      <div (click)="onCancel()" class="fixed inset-0 transition-opacity" style="background-color: rgba(0, 0, 0, 0.8);"></div>
      
      <div class="relative bg-stone-50 w-full max-w-sm rounded-lg shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div class="bg-stone-100 p-4 border-b border-stone-200 flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-lg">
            !
          </div>
          <h2 class="text-stone-800 font-serif text-lg font-bold">{{ title }}</h2>
        </div>

        <div class="p-6">
          <p class="text-sm text-stone-600 leading-relaxed">{{ message }}</p>
        </div>

        <div class="p-4 bg-stone-100 border-t border-stone-200 flex gap-3 justify-end">
          <button (click)="onCancel()" 
                  class="px-4 py-2 border border-stone-300 text-stone-600 font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-stone-200 transition-all">
            Cancelar
          </button>
          <button (click)="onConfirm()" 
                  class="px-4 py-2 bg-red-700 text-stone-100 font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-red-800 shadow-md transition-all">
            Confirmar
          </button>
        </div>

      </div>
    </div>
  `
})
export class ConfirmModalComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = 'Confirmar Ação';
  @Input() message: string = 'Você tem certeza que deseja prosseguir?';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm() {
    this.confirmed.emit();
  }

  onCancel() {
    this.cancelled.emit();
  }
}