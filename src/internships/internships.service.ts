import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/locations/location.entity';
import { Status } from 'src/status/status.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateInternshipDto } from './Dto/create-internship.dto';
import { Internship } from './internship.entity';

@Injectable()
export class InternshipsService {
  constructor(
    @InjectRepository(Internship)
    private internshipRepository: Repository<Internship>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  findAll(): Promise<Internship[]> {
    return this.internshipRepository.find();
  }

  findOne(id: string): Promise<Internship> {
    return this.internshipRepository.findOneBy({ Id: id });
  }

  async create(createInternshipDto: CreateInternshipDto): Promise<Internship> {
    const student = await this.userRepository.findOneBy({
      Username: createInternshipDto.Student,
    });

    const location = await this.locationRepository.findOneBy({
      Code: createInternshipDto.Location,
    });

    const mentor = await this.userRepository.findOneBy({
      Username: createInternshipDto.Mentor,
    });

    const status = await this.statusRepository.findOneBy({
      Code: createInternshipDto.Status,
    });

    const internship = new Internship();
    internship.Year = createInternshipDto.Year;
    internship.Student = student;
    internship.Location = location;
    internship.Mentor = mentor;
    internship.Status = status;

    return this.internshipRepository.save(internship);
  }

  async remove(id: string): Promise<void> {
    await this.internshipRepository.delete(id);
  }
}
