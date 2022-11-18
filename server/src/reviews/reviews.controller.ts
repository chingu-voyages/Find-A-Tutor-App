import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateReviewEntity,
  DeleteReviewEntity,
  GetReviewEntity,
  GetReviewsEntity,
  UpdateReviewEntity,
} from './entities/review-responses.entity';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateReviewEntity })
  async create(@Body() createReviewDto: CreateReviewDto, @Res() res: Response) {
    const createdReview = await this.reviewsService.create(createReviewDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: createdReview,
    });
  }

  @Get()
  @ApiOkResponse({ type: GetReviewsEntity })
  async findAll(@Res() res: Response) {
    const reviews = await this.reviewsService.findAll();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: reviews,
    });
  }

  @Get('tutor/:profileId')
  @ApiOkResponse({ type: GetReviewsEntity })
  async findAllByTutor(
    @Param('profileId', ParseIntPipe) profileId: number,
    @Res() res: Response,
  ) {
    const reviews = await this.reviewsService.findAllByTutor(profileId);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: reviews,
    });
  }

  @Get('student/:userId')
  @ApiOkResponse({ type: GetReviewsEntity })
  async findAllByStudent(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    const reviews = await this.reviewsService.findAllByStudent(userId);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: reviews,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: GetReviewEntity })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const review = await this.reviewsService.findOne(id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: review,
    });
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateReviewEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Res() res: Response,
  ) {
    const updatedReview = await this.reviewsService.update(id, updateReviewDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: updatedReview,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteReviewEntity })
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const deletedReview = await this.reviewsService.remove(id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: deletedReview,
    });
  }
}
