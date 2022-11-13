import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    const tutor = await this.prisma.profile.findUnique({
      where: { id: createReviewDto.profileId },
    });

    if (!tutor) {
      throw new NotFoundException(
        `Tutor with profileId: ${createReviewDto.profileId} not found. Could not create a review under a tutor's profile that does not exist.`,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: createReviewDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with userId: ${createReviewDto.userId} not found. Could not create a review  by a user that does not exist.`,
      );
    }

    return await this.prisma.review.create({
      data: {
        text: createReviewDto.text,
        rating: createReviewDto.rating,
        profile: {
          connect: { id: createReviewDto.profileId },
        },
        user: {
          connect: { id: createReviewDto.userId },
        },
      },
    });
  }

  async findAll() {
    const reviews = await this.prisma.review.findMany({
      include: {
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        user: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!reviews.length) {
      throw new NotFoundException('No reviews found');
    }

    return reviews;
  }

  async findAllByTutor(profileId: number) {
    const reviews = await this.prisma.review.findMany({
      where: { profileId },
      include: {
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        user: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!reviews.length) {
      throw new NotFoundException(
        `No reviews found for tutor with profileId: ${profileId}`,
      );
    }

    return reviews;
  }

  async findAllByStudent(userId: number) {
    const reviews = await this.prisma.review.findMany({
      where: { userId },
      include: {
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        user: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!reviews.length) {
      throw new NotFoundException(
        `No reviews found by user with userId: ${userId}`,
      );
    }

    return reviews;
  }

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id: id },
      include: {
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        user: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException(`No review with id: ${id} found`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    await this.findOne(id);

    return await this.prisma.review.update({
      where: { id: id },
      data: updateReviewDto,
      include: {
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        user: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.review.delete({
      where: { id: id },
      include: {
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        user: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }
}
