import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/locations/location.entity';
import { Status } from 'src/status/status.entity';
import { User } from 'src/users/user.entity';
import { Equal, Not, Repository } from 'typeorm';
import { CreateJournalDto } from './Dto/create-journal.dto';
import { Journal } from './journal.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import * as moment from 'moment';

@Injectable()
export class JournalsService {
  constructor(
    @InjectRepository(Journal)
    private journalRepository: Repository<Journal>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  findAll(conditions: object): Promise<Journal[]> {
    return this.journalRepository.find(conditions);
  }

  findOne(id: string): Promise<Journal> {
    return this.journalRepository.findOneBy({ Id: id });
  }

  async create(
    createJournalDto: CreateJournalDto,
    @CurrentUser() currentUser: User,
  ): Promise<Journal> {
    const student = await this.userRepository.findOneBy({
      Id: createJournalDto.Student,
    });

    const journalExist = await this.journalRepository.find({
      where: {
        Date: createJournalDto.Date,
        Student: {
          Id: student.Id,
        },
      },
      relations: {
        Student: true,
      },
    });

    if (journalExist.length > 0) {
      throw new HttpException(
        `Journal for ${moment(createJournalDto.Date).format(
          'DD MMMM YYYY',
        )} already exist!`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const status = await this.statusRepository.findOneBy({
      Code: 'verifying',
    });

    const location = await this.locationRepository.findOneBy({
      Code: createJournalDto.Location,
    });

    const journal = new Journal();
    journal.Date = createJournalDto.Date;
    journal.Absence = createJournalDto.Absence;
    journal.AbsenceNote = createJournalDto.AbsenceNote;
    journal.Note = createJournalDto.Note;
    journal.Status = status;
    journal.Student = student;
    journal.Location = location;

    return this.journalRepository.save(journal);
  }

  async update(
    createJournalDto: CreateJournalDto,
    journalId: string,
  ): Promise<Journal> {
    const student = await this.userRepository.findOneBy({
      Id: createJournalDto.Student,
    });

    const journalExist = await this.journalRepository.find({
      where: {
        Id: Not(Equal(journalId)),
        Date: createJournalDto.Date,
        Student: {
          Id: student.Id,
        },
      },
      relations: {
        Student: true,
      },
    });

    if (journalExist.length > 0) {
      throw new HttpException(
        `Journal for ${moment(createJournalDto.Date).format(
          'DD MMMM YYYY',
        )} already exist!`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const journal = await this.journalRepository.findOneBy({
      Id: journalId,
    });

    journal.Date = createJournalDto.Date;
    journal.Absence = createJournalDto.Absence;
    journal.AbsenceNote = createJournalDto.AbsenceNote;
    journal.Status = journal.Status;

    return this.journalRepository.save(journal);
  }

  async updateStatus(id: string, status: string): Promise<Journal> {
    const journal = await this.journalRepository.findOneBy({ Id: id });
    const newStatus = await this.statusRepository.findOneBy({ Code: status });

    journal.Status = newStatus;
    journal.Note = note;

    return this.journalRepository.save(journal);
  }

  async remove(id: string): Promise<void> {
    await this.journalRepository.delete(id);
  }
}
