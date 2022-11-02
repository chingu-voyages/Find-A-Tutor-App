import { ApiProperty } from '@nestjs/swagger';
import { Profile, Role, User } from '@prisma/client';

export class SignInEntity implements SignInEntity {

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  password: string;
}