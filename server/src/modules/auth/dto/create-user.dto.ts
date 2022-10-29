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
  password: any;

  @ApiProperty({ required: false })
  profile?: Profile;

  @ApiProperty()
  role: Role;
}
