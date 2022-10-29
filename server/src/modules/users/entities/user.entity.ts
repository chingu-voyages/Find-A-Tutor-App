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
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false, nullable: true })
  profile: Profile;

  @ApiProperty()
  role: Role;
}
