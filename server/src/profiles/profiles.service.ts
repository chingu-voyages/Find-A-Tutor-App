import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto) {
    return await this.prisma.profile.create({ data: createProfileDto });
  }

  async findAll() {
    return await this.prisma.profile.findMany({ include: { user: true } });
  }

  async findOne(id: number) {
    return await this.prisma.profile.findUnique({
      where: { userId: id },
      include: { user: true },
    });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.prisma.profile.update({
      where: { userId: id },
      data: updateProfileDto,
      include: { user: true },
    });
  }

  async remove(id: number) {
    return await this.prisma.profile.delete({ where: { userId: id } });
  }
}
