import { Role } from '../utils/Role';

export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  bio: string;
  subjects: string;
  edLevel: string;
  rate: number;
  phone: string;
  city: string;
  state: string;
  profileUrl: string;
  userId: number;
  user: {
    id: number;
    email: string;
    password: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
  };
}
