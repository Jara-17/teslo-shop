import { Component, input } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'form-error-message',
  templateUrl: 'form-error-message.component.html',
})

export class FormErrorMessageComponent {
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  touched = input(false);
}
