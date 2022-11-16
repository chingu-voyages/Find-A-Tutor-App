import { Prisma, Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

class ProfileUserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({ type: String, enum: Role })
  role: Role;

  constructor(partial: Partial<ProfileUserEntity>) {
    Object.assign(this, partial);
  }
}

export class ProfileEntity {
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

  @Type(() => ProfileUserEntity)
  @ApiProperty()
  user: ProfileUserEntity;

  constructor(partial: Partial<ProfileEntity>) {
    Object.assign(this, partial);
  }
}

export class ProfileAndReviewDataEntity extends ProfileEntity {
  @ApiProperty({ required: false })
  reviewsCount: number;

  @ApiProperty({ required: false, nullable: true })
  avgRating: number | null;

  super(partial: Partial<ProfileAndReviewDataEntity>) {
    Object.assign(this, partial);
  }
}
