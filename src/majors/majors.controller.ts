import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MajorsService } from './majors.service';
import { CreateMajorDto } from './Dto/create-major.dto';

@Controller('majors')
export class MajorsController {
  constructor(private majorsService: MajorsService) {}

  @Get()
  async getMajors() {
    return await this.majorsService.findAll();
  }

  @Post()
  async createMajor(@Body() createMajorDto: CreateMajorDto) {
    return await this.majorsService.create(createMajorDto);
  }
}
