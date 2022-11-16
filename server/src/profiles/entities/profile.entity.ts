import { Prisma, Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ProfileUserEntity {
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

  constructor(partial: Partial<ProfileUserEntity>) {
    Object.assign(this, partial);
  }
}

// export class reviewData {
//   @ApiProperty({ required: false })
//   _count: {
//     reviews: number;
//   };

//   @ApiProperty({ required: false, nullable: true })
//   avgRating: number | null;
// }

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

  @ApiProperty({ required: false })
  reviewsCount: number | null;

  @ApiProperty({ required: false, nullable: true })
  avgRating: number | null;

  constructor(partial: Partial<ProfileEntity>) {
    Object.assign(this, partial);
  }
}
