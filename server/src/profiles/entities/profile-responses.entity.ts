import { ProfileAndReviewDataEntity, ProfileEntity } from './profile.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileEntity {
  @ApiProperty({ default: 201 })
  statusCode: number;

  @ApiProperty()
  data: ProfileEntity;
}

export class GetProfilesEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ type: [ProfileAndReviewDataEntity] })
  data: ProfileAndReviewDataEntity[];
}

export class GetProfileEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  data: ProfileAndReviewDataEntity;
}

export class UpdateProfileEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  data: ProfileEntity;
}

export class DeleteProfileEntity extends UpdateProfileEntity {}
