import { Component, computed, input } from '@angular/core';

interface PasswordRule {
  label: string;
  met: boolean;
}

@Component({
  selector: 'app-password-strength',
  templateUrl: 'password-strength.component.html',
})

export class PasswordStrengthComponent {
  password = input('');

  protected readonly rules = computed<PasswordRule[]>(() => {
    const value = this.password();
    return [
      { label: 'At least 8 characters', met: value.length >= 8 },
      { label: 'An uppercase letter', met: /[A-Z]/.test(value) },
      { label: 'A lowercase letter', met: /[a-z]/.test(value) },
      { label: 'A number', met: /[0-9]/.test(value) },
      { label: 'A special character', met: /[^A-Za-z0-9]/.test(value) },
    ];
  });

  protected readonly level = computed(() => this.rules().filter((rule) => rule.met).length);

  protected readonly progressColor = computed(() => {
    const level = this.level();
    if (level <= 2) return 'progress-error';
    if (level <= 4) return 'progress-warning';
    return 'progress-success';
  });
}
