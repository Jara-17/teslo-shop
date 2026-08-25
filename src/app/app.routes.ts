import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes')
    //TODO: Add a guard to prevent logged in users from accessing the auth routes
  },
  {
    path: '',
    loadChildren: () =>
      import('./store-front/store-front.routes')
  }
];
