import { HttpResourceRequest } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '../interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';

const baseUrl = environment.apiUrl;
const TOKEN_KEY = 'token';

interface LoginRequestBody {
  email: string;
  password: string;
}

interface RegisterRequestBody {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._currentUser());

  loginRequest({ email, password }: LoginRequestBody): HttpResourceRequest {
    return {
      url: `${baseUrl}/auth/login`,
      method: 'POST',
      body: { email, password }
    };
  }

  registerRequest({ fullName, email, password }: RegisterRequestBody): HttpResourceRequest {
    return {
      url: `${baseUrl}/auth/register`,
      method: 'POST',
      body: { fullName, email, password }
    };
  }

  setSession({ token, ...user }: AuthResponse): User {
    localStorage.setItem(TOKEN_KEY, token);
    this._currentUser.set(user);
    return user;
  }
}
