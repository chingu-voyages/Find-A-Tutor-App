import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from './../prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { ProfileEntity } from './entities/profile.entity';
import { Profile, Prisma } from '@prisma/client';

interface profileData {
  id: number;
  firstName: string;
  lastName: string;
  age: number | null;
  bio: string | null;
  subjects: string | null;
  edLevel: string | null;
  rate: Prisma.Decimal | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  profileUrl: string;
  userId: number;
  reviewsCount: number;
  avgRating: number | null;
  user: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    role: string;
  };
}

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(id: number, createProfileDto: CreateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id: ${id} not found. Could not generate a profile for a user that does not exist.`,
      );
    }

    if (user.profile) {
      throw new ForbiddenException(
        `User with id: ${id} already has a profile. Please use Patch route if attempting to update profile for this user.`,
      );
    }

    const createdProfile = await this.prisma.profile.create({
      data: { ...createProfileDto, user: { connect: { id: id } } },
      include: { user: true },
    });

    const serializedProfile = plainToClass(ProfileEntity, createdProfile);

    return serializedProfile;
  }

  async findAll() {
    const profiles = await this.prisma.profile.findMany({
      include: {
        _count: {
          select: { reviews: true },
        },
        user: true,
      },
    });

    if (!profiles.length) {
      throw new NotFoundException('No profiles found');
    }

    const profilesWithAvgRating: profileData[] = await Promise.all(
      profiles.map(async (profile): Promise<profileData> => {
        const reviewsCount = profile._count.reviews;
        delete profile._count;

        if (!reviewsCount) {
          return {
            ...profile,
            reviewsCount,
            avgRating: null,
          };
        }

        const averageRating = await this.prisma.review.aggregate({
          _avg: {
            rating: true,
          },
          where: {
            profileId: profile.id,
          },
        });

        return {
          ...profile,
          reviewsCount,
          avgRating: Number(averageRating._avg.rating.toFixed(1)),
        };
      }),
    );

    const serializedProfiles = profilesWithAvgRating.map((profile) =>
      plainToClass(ProfileEntity, profile),
    );

    return serializedProfiles;
  }

  async findOne(id: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId: id },
      include: { user: true },
    });

    if (!profile) {
      throw new NotFoundException(
        `Profile belonging to userId: ${id} not found`,
      );
    }

    const serializedProfile = plainToClass(ProfileEntity, profile);

    return serializedProfile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    await this.findOne(id);

    const updatedProfile = await this.prisma.profile.update({
      where: { userId: id },
      data: updateProfileDto,
      include: { user: true },
    });

    const serializedProfile = plainToClass(ProfileEntity, updatedProfile);

    return serializedProfile;
  }

  async remove(id: number) {
    await this.findOne(id);

    const deletedUser = await this.prisma.profile.delete({
      where: { userId: id },
      include: { user: true },
    });

    const serializedProfile = plainToClass(ProfileEntity, deletedUser);

    return serializedProfile;
  }
}
