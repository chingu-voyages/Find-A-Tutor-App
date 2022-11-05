// import { PartialType } from '@nestjs/swagger';
// import { CreateUserDto } from './create-user.dto';

import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @ApiProperty({ required: false, nullable: true })
  email: string;

  @ApiProperty({ required: false, nullable: true })
  password: string;

  @ApiProperty({
    required: false,
    nullable: true,
    type: Role,
    enum: ['STUDENT', 'TUTOR'],
  })
  role: 'STUDENT' | 'TUTOR';
}
