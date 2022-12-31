import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateJournalDto } from './Dto/create-journal.dto';
import { JournalsService } from './journals.service';

@Controller('journals')
export class JournalsController {
  constructor(private journalService: JournalsService) {}

  @Get()
  async getJournals() {
    return await this.journalService.findAll();
  }

  @Get(':journalId')
  async getJournal(@Param('journalId') journalId) {
    return await this.journalService.findOne(journalId);
  }

  @Post()
  async createJournal(@Body() createJournalDto: CreateJournalDto) {
    return await this.journalService.create(createJournalDto);
  }

  @Delete(':journalId')
  async remote(@Param('journalId') journalId) {
    return await this.journalService.remove(journalId);
  }
}
