import { ApiProperty } from '@nestjs/swagger';
import { Profile, Role, User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  profile: Profile;

  @ApiProperty()
  role: Role;
}
