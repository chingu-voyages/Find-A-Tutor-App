import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findUserByEmail(createUserDto.email);

    if (userExists) {
      throw new ConflictException('this email already exists');
    }

    createUserDto.password = this.hashPassword(createUserDto.password);

    const createdUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        profile: {
          create: createUserDto.profile,
        },
      },
      include: {
        profile: true,
      },
    });

    const serializedUser = plainToClass(UserEntity, createdUser);

    return serializedUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: { profile: true },
    });

    if (!users.length) {
      throw new NotFoundException('No users found');
    }

    const serializedUsers = users.map((user) => plainToClass(UserEntity, user));

    return serializedUsers;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    const serializedUser = plainToClass(UserEntity, user);

    return serializedUser;
  }

  async findAllStudents() {
    const students = await this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: { profile: true },
    });

    if (!students.length) {
      throw new NotFoundException('No students found');
    }

    const serializedStudents = students.map((student) =>
      plainToClass(UserEntity, student),
    );

    return serializedStudents;
  }

  async findAllTutors() {
    const tutors = await this.prisma.user.findMany({
      where: { role: 'TUTOR' },
      include: { profile: true },
    });

    if (!tutors.length) {
      throw new NotFoundException('No tutors found');
    }

    const serializedTutors = tutors.map((tutor) =>
      plainToClass(UserEntity, tutor),
    );

    return serializedTutors;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new NotFoundException(
        `User with id: ${id} not found. Could not update.`,
      );
    }

    if (updateUserDto.password) {
      updateUserDto.password = this.hashPassword(updateUserDto.password);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
      include: { profile: true },
    });

    const serializedUser = plainToClass(UserEntity, updatedUser);

    return serializedUser;
  }

  async remove(id: number) {
    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    const deletedUser = await this.prisma.user.delete({
      where: { id: id },
      include: { profile: true },
    });

    const serializedUser = plainToClass(UserEntity, deletedUser);

    return serializedUser;
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email: email } });
  }

  hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }
}
