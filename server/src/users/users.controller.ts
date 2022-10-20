import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  // Res,
  // HttpStatus,
} from '@nestjs/common';
// import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  // @Res({ passthrough: true }) res: Response
  async findAll() {
    const users = await this.usersService.findAll();

    if (!users.length) {
      throw new NotFoundException('No users found');
    }

    // res.status(HttpStatus.OK);
    // return {
    //   statusCode: HttpStatus.OK,
    //   data: users,
    // };

    return users;
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(
    @Param('id') id: string,
    // @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    // res.status(HttpStatus.OK);
    // return {
    //   statusCode: HttpStatus.OK,
    //   data: user,
    // };

    return user;
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
