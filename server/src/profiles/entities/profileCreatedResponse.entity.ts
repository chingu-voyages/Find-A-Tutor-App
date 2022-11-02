import { ProfileEntity } from './profile.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileCreatedResponseEntity {
  @ApiProperty({ default: 201 })
  statusCode: number;

  @ApiProperty()
  data: ProfileEntity;
}
