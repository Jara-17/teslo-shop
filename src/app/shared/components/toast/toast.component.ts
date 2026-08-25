import { Component, computed, inject } from '@angular/core';
import { Toast, ToastPosition, ToastService, ToastVariant } from './toast.service';

const VARIANT_STYLES: Record<ToastVariant, { alertClass: string; icon: string }> = {
  success: { alertClass: 'alert-success', icon: 'fa-solid fa-circle-check' },
  error: { alertClass: 'alert-error', icon: 'fa-solid fa-circle-exclamation' },
  warning: { alertClass: 'alert-warning', icon: 'fa-solid fa-triangle-exclamation' },
  info: { alertClass: 'alert-info', icon: 'fa-solid fa-circle-info' },
};

const POSITION_CLASSES: Record<ToastPosition, string> = {
  'top-start': 'toast-top toast-start',
  'top-center': 'toast-top toast-center',
  'top-end': 'toast-top toast-end',
  'middle-start': 'toast-middle toast-start',
  'middle-center': 'toast-middle toast-center',
  'middle-end': 'toast-middle toast-end',
  'bottom-start': 'toast-bottom toast-start',
  'bottom-center': 'toast-bottom toast-center',
  'bottom-end': 'toast-bottom toast-end',
};

interface ToastGroup {
  position: ToastPosition;
  positionClass: string;
  toasts: Toast[];
}

@Component({
  selector: 'app-toast',
  templateUrl: 'toast.component.html',
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);
  protected readonly variantStyles = VARIANT_STYLES;

  protected readonly groups = computed<ToastGroup[]>(() => {
    const byPosition = new Map<ToastPosition, Toast[]>();
    for (const toast of this.toastService.toasts()) {
      byPosition.set(toast.position, [...(byPosition.get(toast.position) ?? []), toast]);
    }
    return [...byPosition.entries()].map(([position, toasts]) => ({
      position,
      positionClass: POSITION_CLASSES[position],
      toasts,
    }));
  });
}
