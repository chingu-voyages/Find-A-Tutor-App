import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @Res() res: Response,
  ) {
    const createdProfile = this.profilesService.create(createProfileDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: createdProfile,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const profiles = await this.profilesService.findAll();

    if (!profiles.length) {
      throw new NotFoundException('No profiles found');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: profiles,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const profile = await this.profilesService.findOne(id);

    if (!profile) {
      throw new NotFoundException(
        `Profile belonging to userId: ${id} not found`,
      );
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: profile,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
    @Res() res: Response,
  ) {
    const updatedProfile = await this.profilesService.update(
      id,
      updateProfileDto,
    );

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: updatedProfile,
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const removedProfile = await this.profilesService.remove(id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: removedProfile,
    });
  }
}
