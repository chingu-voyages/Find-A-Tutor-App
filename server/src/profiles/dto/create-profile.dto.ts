import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CreateProfileDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false, nullable: true })
  age?: number;

  @ApiProperty({ required: false, nullable: true })
  bio?: string;

  @ApiProperty({ required: false, nullable: true })
  subjects?: string;

  @ApiProperty({ required: false, nullable: true })
  rate?: number;

  @ApiProperty({ required: false, nullable: true })
  phone?: string;

  @ApiProperty({ required: false, nullable: true })
  city?: string;

  @ApiProperty({ required: false, nullable: true })
  state?: string;

  @ApiProperty()
  user: User;
}
