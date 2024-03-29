import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
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

  @Put('/:internshipId/status')
  async updateStatus(
    @Param('internshipId') internshipId,
    @Body() createInternshipDto: CreateInternshipDto,
  ) {
    return await this.internshipService.updateStatus(
      internshipId,
      createInternshipDto.Status,
    );
  }

  @Delete(':internshipId')
  async remove(@Param('internshipId') internshipId) {
    return await this.internshipService.remove(internshipId);
  }

  @Put(':internshipId')
  async updateInternship(
    @Body() createInternshipDto: CreateInternshipDto,
    @Param('internshipId') internshipId,
  ) {
    return await this.internshipService.update(
      createInternshipDto,
      internshipId,
    );
  }
}
