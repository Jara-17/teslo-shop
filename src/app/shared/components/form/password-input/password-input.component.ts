import { Component, input, model, output, signal } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { InputComponent } from '../input/input.component';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';

@Component({
  selector: 'form-password-input',
  templateUrl: 'password-input.component.html',
  imports: [InputComponent, PasswordStrengthComponent],
})

export class PasswordInputComponent implements FormValueControl<string> {
  value = model('');

  label = input<string>();
  placeholder = input('');
  icon = input<string>();
  showStrengthPanel = input(false);

  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  touched = input(false);
  disabled = input(false);

  touch = output<void>();

  protected readonly showPassword = signal(false);

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }
}
