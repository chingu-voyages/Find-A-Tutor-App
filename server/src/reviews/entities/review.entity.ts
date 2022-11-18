import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

class ReviewProfileEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

class ReviewUserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: String, enum: Role, default: 'STUDENT' })
  role: Role;

  @ApiProperty()
  profile: ReviewProfileEntity;
}

export class ReviewEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  text: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  profileId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  profile: ReviewProfileEntity;

  @ApiProperty()
  user: ReviewUserEntity;
}
