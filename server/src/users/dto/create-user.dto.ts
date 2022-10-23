import { ApiProperty } from '@nestjs/swagger';
import { Role, Profile } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  profile?: Profile;

  @ApiProperty()
  role: Role;
}
