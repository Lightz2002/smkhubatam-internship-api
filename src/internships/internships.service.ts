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
    return this.internshipRepository.find({
      order: {
        Created_at: 'DESC',
      },
    });
  }

  findOne(id: string): Promise<Internship> {
    return this.internshipRepository.findOneBy({ Id: id });
  }

  findOneByStudent(studentId: string): Promise<Internship> {
    return this.internshipRepository.findOneBy({
      Student: {
        Id: studentId,
      },
    });
  }

  async create(createInternshipDto: CreateInternshipDto): Promise<Internship> {
    const student = await this.userRepository.findOneBy({
      Id: createInternshipDto.Student,
    });

    const location = await this.locationRepository.findOneBy({
      Id: createInternshipDto.Location,
    });

    const fieldMentor = await this.userRepository.findOneBy({
      Id: createInternshipDto.FieldMentor,
    });

    const schoolMentor = await this.userRepository.findOneBy({
      Id: createInternshipDto.SchoolMentor,
    });

    const status = await this.statusRepository.findOneBy({
      Code: 'entry',
    });

    const internship = new Internship();
    internship.Year = createInternshipDto.Year;
    internship.Student = student;
    internship.Location = location;
    internship.FieldMentor = fieldMentor;
    internship.SchoolMentor = schoolMentor;
    internship.Status = status;

    return this.internshipRepository.save(internship);
  }

  async update(
    createInternshipDto: CreateInternshipDto,
    internshipId: string,
  ): Promise<Internship> {
    const student = await this.userRepository.findOneBy({
      Id: createInternshipDto.Student,
    });

    const location = await this.locationRepository.findOneBy({
      Id: createInternshipDto.Location,
    });

    const fieldMentor = await this.userRepository.findOneBy({
      Id: createInternshipDto.FieldMentor,
    });

    const schoolMentor = await this.userRepository.findOneBy({
      Id: createInternshipDto.SchoolMentor,
    });

    const status = await this.statusRepository.findOneBy({
      Code: 'entry',
    });

    const internship = await this.internshipRepository.findOneBy({
      Id: internshipId,
    });
    internship.Year = createInternshipDto.Year;
    internship.Student = student;
    internship.Location = location;
    internship.FieldMentor = fieldMentor;
    internship.SchoolMentor = schoolMentor;
    internship.Status = status;

    return this.internshipRepository.save(internship);
  }

  async updateStatus(id: string, status: string): Promise<Internship> {
    const internship = await this.internshipRepository.findOneBy({ Id: id });
    const newStatus = await this.statusRepository.findOneBy({ Code: status });

    internship.Status = newStatus;

    return this.internshipRepository.save(internship);
  }

  async remove(id: string): Promise<void> {
    await this.internshipRepository.delete(id);
  }
}
