import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Res,
  HttpStatus,
  ParseIntPipe,
  ConflictException,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  UserOkResponseEntity,
  UserOkResponseEntityArray,
} from './entities/userOkResponse.entity';
import { UserCreatedResponseEntity } from './entities/userCreatedResponse.entity';
import * as bcrypt from 'bcrypt';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserCreatedResponseEntity })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const userExists = await this.usersService.findUserByEmail(
      createUserDto.email,
    );

    if (userExists) {
      throw new ConflictException('this email already exists');
    }

    const saltRounds = 10;
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const createdUser = await this.usersService.create(createUserDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: createdUser,
    });
  }

  @Get()
  @ApiOkResponse({ type: UserOkResponseEntityArray })
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();

    if (!users.length) {
      throw new NotFoundException('No users found');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: users,
    });
  }

  @Get('students')
  @ApiOkResponse({ type: UserOkResponseEntityArray })
  async findAllStudents(@Res() res: Response) {
    const students = await this.usersService.findAllStudents();

    if (!students.length) {
      throw new NotFoundException('No students found');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: students,
    });
  }

  @Get('tutors')
  @ApiOkResponse({ type: UserOkResponseEntityArray })
  async findAllTutors(@Res() res: Response) {
    const tutors = await this.usersService.findAllTutors();

    if (!tutors.length) {
      throw new NotFoundException('No tutors found');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: tutors,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: UserOkResponseEntity })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: user,
    });
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserOkResponseEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: updatedUser,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserOkResponseEntity })
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const removedUser = await this.usersService.remove(id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: removedUser,
    });
  }
}
