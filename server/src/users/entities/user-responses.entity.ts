import { UserEntity, UserEntityTutor } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserEntity {
  @ApiProperty({ default: 201 })
  statusCode: number;

  @ApiProperty()
  data: UserEntity;
}

export class GetUserEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  data: UserEntity;
}

export class GetUsersEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ type: [UserEntity] })
  data: UserEntity[];
}

export class GetStudentsEntity extends GetUsersEntity {}

export class GetTutorsEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ type: [UserEntityTutor] })
  data: UserEntityTutor[];
}

export class UpdateUserEntity extends GetUserEntity {}

export class DeleteUserEntity extends GetUserEntity {}
