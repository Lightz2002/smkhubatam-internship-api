import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateInternshipDto } from './Dto/create-internship.dto';
import { InternshipsService } from './internships.service';

@Controller('internships')
export class InternshipsController {
  constructor(private internshipService: InternshipsService) {}

  @Get()
  async getInternships() {
    return await this.internshipService.findAll();
  }

  @Get(':internshipId')
  async getInternship(@Param('internshipId') internshipId) {
    return await this.internshipService.findOne(internshipId);
  }

  @Post()
  async createInternship(@Body() createInternshipDto: CreateInternshipDto) {
    return await this.internshipService.create(createInternshipDto);
  }

  @Delete(':internshipId')
  async remove(@Param('internshipId') internshipId) {
    return await this.internshipService.remove(internshipId);
  }
}
