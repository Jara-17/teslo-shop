import { User } from './user.interface';

export interface AuthResponse extends User {
  token: string;
}
