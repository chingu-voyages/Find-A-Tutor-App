import { ApiProperty } from '@nestjs/swagger';
import { ReviewEntity } from './review.entity';

export class CreateReviewEntity {
  @ApiProperty({ default: 201 })
  statusCode: number;

  @ApiProperty()
  data: ReviewEntity;
}

export class GetReviewsEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ type: [ReviewEntity] })
  data: ReviewEntity[];
}

export class GetReviewEntity {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  data: ReviewEntity;
}

export class UpdateReviewEntity extends CreateReviewEntity {}

export class DeleteReviewEntity extends CreateReviewEntity {}
