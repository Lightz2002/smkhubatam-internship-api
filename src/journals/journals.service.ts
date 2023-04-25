import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/locations/location.entity';
import { Status } from 'src/status/status.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateJournalDto } from './Dto/create-journal.dto';
import { Journal } from './journal.entity';

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
    console.log(conditions);
    return this.journalRepository.find(conditions);
  }

  findOne(id: string): Promise<Journal> {
    return this.journalRepository.findOneBy({ Id: id });
  }

  async create(createJournalDto: CreateJournalDto): Promise<Journal> {
    const user = await this.userRepository.findOneBy({
      Username: createJournalDto.Student,
    });

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
    journal.Student = user;
    journal.Location = location;

    return this.journalRepository.save(journal);
  }

  async updateStatus(
    id: string,
    status: string,
    note: string,
  ): Promise<Journal> {
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
