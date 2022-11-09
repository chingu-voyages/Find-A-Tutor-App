import { Role } from '../utils/Role';

export interface IUser {
  id: number;
  token: string;
  role: Role;
}
