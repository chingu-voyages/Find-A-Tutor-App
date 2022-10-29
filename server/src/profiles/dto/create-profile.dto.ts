import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CreateProfileDto {
  age: number;

  bio?: string;

  contactInfo: string;

  user: User;
}
