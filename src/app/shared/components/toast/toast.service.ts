import { Injectable, signal } from '@angular/core';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-start' | 'top-center' | 'top-end'
  | 'middle-start' | 'middle-center' | 'middle-end'
  | 'bottom-start' | 'bottom-center' | 'bottom-end';

export interface ToastOptions {
  title: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
}

export interface Toast {
  id: number;
  variant: ToastVariant;
  title: string;
  message: string;
  position: ToastPosition;
}

const DEFAULT_DURATION_MS = 3000;
const DEFAULT_POSITION: ToastPosition = 'top-end';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  private nextId = 0;

  success(options: ToastOptions) {
    this.show('success', options);
  }

  error(options: ToastOptions) {
    this.show('error', options);
  }

  warning(options: ToastOptions) {
    this.show('warning', options);
  }

  info(options: ToastOptions) {
    this.show('info', options);
  }

  dismiss(id: number) {
    this._toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  private show(variant: ToastVariant, { title, message, duration = DEFAULT_DURATION_MS, position = DEFAULT_POSITION }: ToastOptions) {
    const id = this.nextId++;
    this._toasts.update((toasts) => [...toasts, { id, variant, title, message, position }]);
    setTimeout(() => this.dismiss(id), duration);
  }
}
