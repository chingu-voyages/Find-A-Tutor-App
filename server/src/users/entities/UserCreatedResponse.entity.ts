import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreatedResponseEntity {
  @ApiProperty({ default: 201 })
  statusCode: number;

  @ApiProperty()
  data: UserEntity;
}
