import { UserEntity, UserEntityTutor } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserOkResponseEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  data: UserEntity;
}

export class UserOkResponseEntityArray {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ type: [UserEntity] })
  data: UserEntity[];
}

export class UserOkResponseEntityArrayTutors {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ type: [UserEntityTutor] })
  data: UserEntityTutor[];
}
