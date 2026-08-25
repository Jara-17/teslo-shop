import { Component, input, model, output } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';

@Component({
  selector: 'form-input',
  templateUrl: 'input.component.html',
  imports: [FormErrorMessageComponent],
})

export class InputComponent implements FormValueControl<string> {
  value = model('');

  label = input<string>();
  type = input<'text' | 'email' | 'password'>('text');
  placeholder = input('');
  icon = input<string>();

  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  touched = input(false);
  disabled = input(false);

  touch = output<void>();
}
