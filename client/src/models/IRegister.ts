import { Role } from '../utils/Role';

export interface IRegister {
  email: string;
  password: string;
  role: Role;
  profile: {
    firstName: string;
    lastName: string;
  };
}
