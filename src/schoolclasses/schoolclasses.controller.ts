import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { SchoolClassesService } from './schoolclasses.service';
import { CreateSchoolClassDto } from './Dto/create-schoolclass.dto';

@Controller('schoolclasses')
export class SchoolClassesController {
  constructor(private schoolClassesService: SchoolClassesService) {}

  @Get()
  async getSchoolClasses() {
    return await this.schoolClassesService.findAll();
  }

  @Get(':schoolClassId')
  async getSchoolClass(@Param(':schoolClassId') schoolClassId) {
    return await this.schoolClassesService.findOne(schoolClassId);
  }

  @Post()
  async createSchoolClass(@Body() CreateSchoolClassDto: CreateSchoolClassDto) {
    return await this.schoolClassesService.create(CreateSchoolClassDto);
  }

  @Put(':schoolClassId')
  async updateSchoolClass(
    @Body() CreateSchoolClassDto: CreateSchoolClassDto,
    @Param(':schoolClassId') schoolClassId,
  ) {
    return await this.schoolClassesService.update(
      CreateSchoolClassDto,
      schoolClassId,
    );
  }
}
