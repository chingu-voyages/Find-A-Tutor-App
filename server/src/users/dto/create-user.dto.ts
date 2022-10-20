import { Role, Profile } from '@prisma/client';

export class CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  profile?: Profile;
  role: Role;
}
