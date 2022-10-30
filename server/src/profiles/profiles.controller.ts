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
import { ProfileCreatedResponseEntity } from './entities/profileCreatedResponse.entity';
import {
  ProfileOkResponseEntity,
  ProfileOkResponseEntityArray,
} from './entities/profileOkResponse.entity';

@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // profile creation should be done through user creation
  @Post()
  @ApiCreatedResponse({ type: ProfileCreatedResponseEntity })
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
  @ApiOkResponse({ type: ProfileOkResponseEntityArray })
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
  @ApiOkResponse({ type: ProfileOkResponseEntity })
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
  @ApiOkResponse({ type: ProfileOkResponseEntity })
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

  // profile deletion should be done through user deletion
  @Delete(':id')
  @ApiOkResponse({ type: ProfileOkResponseEntity })
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const removedProfile = await this.profilesService.remove(id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: removedProfile,
    });
  }
}
