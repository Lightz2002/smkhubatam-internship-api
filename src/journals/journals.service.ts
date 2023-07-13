import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/status/status.entity';
import { User } from 'src/users/user.entity';
import { Equal, Not, Repository } from 'typeorm';
import { CreateJournalDto } from './Dto/create-journal.dto';
import { Journal } from './journal.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import * as moment from 'moment';
import { Internship } from 'src/internships/internship.entity';

@Injectable()
export class JournalsService {
  constructor(
    @InjectRepository(Journal)
    private journalRepository: Repository<Journal>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Status)
    private statusRepository: Repository<Status>,

    @InjectRepository(Internship)
    private internshipRepository: Repository<Internship>,
  ) {}

  findAll(conditions: object): Promise<Journal[]> {
    return this.journalRepository.find(conditions);
  }

  findOne(id: string): Promise<Journal> {
    return this.journalRepository.findOne({
      where: { Id: id },
      relations: {
        Student: {
          Internship: true,
        },
      },
    });
  }

  async getJournalByUserRole(@CurrentUser() user: User) {
    let conditions = {};

    switch (user?.Role?.Name?.toLowerCase()) {
      case 'student':
        conditions = {
          Student: user,
        };
        break;
      case 'school mentor':
        conditions = {
          Student: {
            Internship: {
              SchoolMentor: user,
            },
          },
        };
        break;
      case 'field mentor':
        conditions = {
          Student: {
            Internship: {
              FieldMentor: user,
            },
          },
        };
      default:
        break;
    }

    const journals = await this.journalRepository.find({
      relations: {
        Student: {
          Internship: {
            SchoolMentor: true,
            FieldMentor: true,
          },
        },
      },
      where: conditions,
      order: {
        Date: 'DESC',
      },
    });

    return journals;
  }

  async create(
    createJournalDto: CreateJournalDto,
    @CurrentUser() currentUser: User,
  ): Promise<Journal> {
    const journalExist = await this.journalRepository.find({
      where: {
        Date: createJournalDto.Date,
        Student: {
          Id: currentUser.Id,
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

    const internship = await this.internshipRepository.find({
      where: {
        Student: {
          Id: currentUser.Id,
        },
      },
      relations: { Student: true },
    });

    if (internship.length === 0) {
      throw new HttpException(
        `You haven't been assigned an internship`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const journal = new Journal();
    journal.Date = createJournalDto.Date;
    journal.Absence = createJournalDto.Absence;
    journal.AbsenceNote = createJournalDto.AbsenceNote;
    journal.Note = createJournalDto.Note;
    journal.Status = status;
    journal.Student = currentUser;

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

    return this.journalRepository.save(journal);
  }

  async updateStatus(id: string, status: string): Promise<Journal> {
    const journal = await this.journalRepository.findOneBy({ Id: id });
    const newStatus = await this.statusRepository.findOneBy({ Code: status });

    journal.Status = newStatus;

    return this.journalRepository.save(journal);
  }

  async remove(id: string): Promise<void> {
    await this.journalRepository.delete(id);
  }
}
