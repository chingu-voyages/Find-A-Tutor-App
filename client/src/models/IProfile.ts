import { Role } from '../utils/Role';

export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  bio: string;
  subjects?: string[];
  educationalLevel?: string;
  rate?: number;
  phone?: string;
  city?: string;
  state?: string;
  profileUrl: string;
  userId: number;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
  students?: string[];
  tutors?: string[];
}
