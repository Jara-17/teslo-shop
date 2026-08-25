import { Component, effect, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, minLength, required, submit, validate } from '@angular/forms/signals';
import { AuthTitleComponent } from "@/auth/components/auth-title/auth-title.component";
import { PasswordInputComponent } from "@/shared/components/form/password-input/password-input.component";
import { InputComponent } from '@/shared/components/form/input/input.component';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { AuthService } from '@/auth/services/auth.service';
import { AuthResponse } from '@/auth/interfaces/auth-response.interface';
import { ToastService } from '@/shared/components/toast/toast.service';

export interface RegisterFormModel {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type RegisterBody = Omit<RegisterFormModel, 'confirmPassword'>;

@Component({
  selector: 'register-page',
  templateUrl: 'register-page.component.html',
  imports: [AuthTitleComponent, FormField, RouterLink, InputComponent, PasswordInputComponent, ButtonComponent]
})
export default class RegisterPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  protected readonly model = signal<RegisterFormModel>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  private readonly registerBody = signal<RegisterBody | undefined>(undefined);

  protected readonly registerResource = httpResource<AuthResponse>(() => {
    const body = this.registerBody();
    return body ? this.authService.registerRequest(body) : undefined;
  });

  protected readonly registerForm = form(this.model, (schemaPath) => {
    required(schemaPath.fullName, { message: 'Full name is required' });

    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Invalid email' });

    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 6, { message: 'Must be at least 6 characters' });

    required(schemaPath.confirmPassword, { message: 'Please confirm your password' });
    validate(schemaPath.confirmPassword, ({ value, valueOf }) => {
      if (value() !== valueOf(schemaPath.password)) {
        return { kind: 'mismatch', message: 'Passwords do not match' };
      }
      return undefined;
    });
  });

  private readonly redirectOnRegisterSuccess = effect(() => {
    if (!this.registerResource.hasValue()) return;

    this.authService.setSession(this.registerResource.value());
    this.router.navigateByUrl('/');
  });

  private readonly notifyOnRegisterError = effect(() => {
    if (!this.registerResource.error()) return;

    this.toastService.error({ title: 'Registration failed', message: 'Could not create the account' });
  });

  onSubmit() {
    submit(this.registerForm, async () => {
      const { confirmPassword, ...body } = this.model();

      // httpResource re-triggers on reference change, so always assign a fresh object
      this.registerBody.set({ ...body });
    });
  }
}
