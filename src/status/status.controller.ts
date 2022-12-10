import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateStatusDto } from './Dto/create-status.dto';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @Get()
  async getAllStatus() {
    return await this.statusService.findAll();
  }

  @Get(':statusId')
  async getStatus(@Param('statusId') statusId) {
    return await this.statusService.findAOne(statusId);
  }

  @Post()
  async createStatus(@Body() createStatusDto: CreateStatusDto) {
    return await this.statusService.create(createStatusDto);
  }
}
