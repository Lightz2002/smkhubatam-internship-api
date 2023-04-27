import { InternshipsService } from './../internships/internships.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateJournalDto } from './Dto/create-journal.dto';
import { JournalsService } from './journals.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';

@Controller('journals')
export class JournalsController {
  constructor(
    private journalService: JournalsService,
    private internshipsService: InternshipsService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getJournals(@CurrentUser() user: User) {
    const conditions = {
      where: {},
    };

    if (user?.Role?.Name?.toLowerCase() === 'student') {
      conditions.where = {
        Student: {
          Id: user?.Id,
        },
      };
    }

    return await this.journalService.findAll(conditions);
  }

  @Get(':journalId')
  async getJournal(@Param('journalId') journalId) {
    const journal = await this.journalService.findOne(journalId);
    const internship = await this.internshipsService.findOneByStudent(
      journal.Student.Id,
    );
    return {
      ...journal,
      Internship: internship,
    };
  }

  @Post()
  async createJournal(
    @Body() createJournalDto: CreateJournalDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.journalService.create(createJournalDto, currentUser);
  }

  @Put('/:journalId/status')
  async updateStatus(
    @Param('journalId') journalId,
    @Body() createJournalDto: CreateJournalDto,
  ) {
    return await this.journalService.updateStatus(
      journalId,
      createJournalDto.Status,
    );
  }

  @Put('/:journalId')
  async update(
    @Param('journalId') journalId,
    @Body() createJournalDto: CreateJournalDto,
  ) {
    return await this.journalService.update(createJournalDto, journalId);
  }

  @Delete(':journalId')
  async remote(@Param('journalId') journalId) {
    return await this.journalService.remove(journalId);
  }
}
