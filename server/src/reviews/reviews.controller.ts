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
import { ApiTags } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Res() res: Response) {
    const createdReview = this.reviewsService.create(createReviewDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: createdReview,
    });
  }

  @Get()
  findAll(@Res() res: Response) {
    const reviews = this.reviewsService.findAll();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: reviews,
    });
  }

  @Get('tutor/:profileId')
  findAllByTutor(
    @Param('profileId', ParseIntPipe) profileId: number,
    @Res() res: Response,
  ) {
    const reviews = this.reviewsService.findAllByTutor(profileId);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: reviews,
    });
  }

  @Get('student/:userId')
  findAllByStudent(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    const reviews = this.reviewsService.findAllByStudent(userId);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: reviews,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const review = this.reviewsService.findOne(id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: review,
    });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Res() res: Response,
  ) {
    const updatedReview = this.reviewsService.update(id, updateReviewDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: updatedReview,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const deletedReview = this.reviewsService.remove(id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: deletedReview,
    });
  }
}
