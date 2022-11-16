import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

class UserAuthEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: String, enum: Role })
  role: Role;

  @ApiProperty()
  email: string;
}

export class AuthEntity {
  @ApiProperty()
  user: UserAuthEntity;

  @ApiProperty()
  token: string;
}
