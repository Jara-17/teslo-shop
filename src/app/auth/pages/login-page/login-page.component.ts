import { Component, effect, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { AuthTitleComponent } from "@/auth/components/auth-title/auth-title.component";
import { PasswordInputComponent } from "@/shared/components/form/password-input/password-input.component";
import { InputComponent } from '@/shared/components/form/input/input.component';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { AuthService } from '@/auth/services/auth.service';
import { AuthResponse } from '@/auth/interfaces/auth-response.interface';
import { ToastService } from '@/shared/components/toast/toast.service';

export interface LoginFormModel {
  email: string;
  password: string;
}

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.component.html',
  imports: [AuthTitleComponent, FormField, RouterLink, InputComponent, PasswordInputComponent, ButtonComponent]
})
export default class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  protected readonly model = signal<LoginFormModel>({
    email: '',
    password: '',
  });

  private readonly credentials = signal<LoginFormModel | undefined>(undefined);

  protected readonly loginResource = httpResource<AuthResponse>(() => {
    const credentials = this.credentials();
    return credentials ? this.authService.loginRequest(credentials) : undefined;
  });

  protected readonly loginForm = form(this.model, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Invalid email' });

    required(schemaPath.password, { message: 'Password is required' });
  });

  private readonly redirectOnLoginSuccess = effect(() => {
    if (!this.loginResource.hasValue()) return;

    this.authService.setSession(this.loginResource.value());
    this.router.navigateByUrl('/');
  });

  private readonly notifyOnLoginError = effect(() => {
    if (!this.loginResource.error()) return;

    this.toastService.error({ title: 'Login failed', message: 'Invalid email or password' });
  });

  onSubmit() {
    submit(this.loginForm, async () => {
      // httpResource re-triggers on reference change, so always assign a fresh object
      this.credentials.set({ ...this.model() });
    });
  }
}
