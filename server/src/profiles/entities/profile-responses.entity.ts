import { ProfileEntity } from './profile.entity';
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

  @ApiProperty({ type: [ProfileEntity] })
  data: ProfileEntity[];
}

export class GetProfileEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  data: ProfileEntity;
}

export class UpdateProfileEntity extends GetProfileEntity {}

export class DeleteProfileEntity extends GetProfileEntity {}
