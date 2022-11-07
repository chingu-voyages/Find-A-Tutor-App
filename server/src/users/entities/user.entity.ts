import { ApiProperty } from '@nestjs/swagger';
import { Profile, Role, User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

export class UserProfileEntity implements Profile {
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

  @Type(() => Number)
  @ApiProperty({ type: Number, required: false, nullable: true })
  rate: Prisma.Decimal | null;

  @ApiProperty({ required: false, nullable: true })
  phone: string | null;

  @ApiProperty({ required: false, nullable: true })
  city: string | null;

  @ApiProperty({ required: false, nullable: true })
  state: string | null;

  @ApiProperty({
    required: false,
    default: 'https://placeimg.com/192/192/people',
  })
  profileUrl: string;

  @ApiProperty()
  userId: number;

  constructor(partial: Partial<UserProfileEntity>) {
    Object.assign(this, partial);
  }
}

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

  @ApiProperty({ type: String, enum: ['STUDENT', 'TUTOR'] })
  role: Role;

  @Type(() => UserProfileEntity)
  @ApiProperty()
  profile: UserProfileEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

export class UserEntityTutor extends UserEntity {
  @ApiProperty({ type: String, enum: ['STUDENT', 'TUTOR'], default: 'TUTOR' })
  role: Role;
}
