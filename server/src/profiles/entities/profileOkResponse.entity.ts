import { ProfileEntity } from './profile.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileOkResponseEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  data: ProfileEntity;
}

export class ProfileOkResponseEntityArray {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ type: [ProfileEntity] })
  data: ProfileEntity[];
}
