import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SchoolClassesService } from './schoolclasses.service';
import { CreateSchoolClassDto } from './Dto/create-schoolclass.dto';

@Controller('schoolclasses')
export class SchoolClassesController {
  constructor(private schoolClassesService: SchoolClassesService) {}

  @Get()
  async getSchoolClass() {
    return await this.schoolClassesService.findAll();
  }

  @Post()
  async createSchoolClass(@Body() CreateSchoolClassDto: CreateSchoolClassDto) {
    return await this.schoolClassesService.create(CreateSchoolClassDto);
  }
}
