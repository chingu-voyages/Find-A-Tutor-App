import { Role } from './Role';

export interface User {
  id: number;
  token: string;
  role: Role;
}
