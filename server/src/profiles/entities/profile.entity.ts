import { Profile, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity implements Profile {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false, nullable: true })
  age: number | null;

  @ApiProperty({ required: false, nullable: true })
  bio: string | null;

  @ApiProperty({ required: false, nullable: true })
  subjects: string | null;

  @ApiProperty({ required: false, nullable: true })
  edLevel: string | null;

  @ApiProperty({ required: false, nullable: true })
  profileUrl: string | null;

  @ApiProperty({ required: false, nullable: true })
  rate: Prisma.Decimal | null;

  @ApiProperty({ required: false, nullable: true })
  phone: string | null;

  @ApiProperty({ required: false, nullable: true })
  city: string | null;

  @ApiProperty({ required: false, nullable: true })
  state: string | null;

  @ApiProperty()
  userId: number;
}
