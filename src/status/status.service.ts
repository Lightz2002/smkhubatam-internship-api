import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './Dto/create-status.dto';
import { Status } from './status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  findAll(): Promise<Status[]> {
    return this.statusRepository.find();
  }

  findAOne(id: string): Promise<Status> {
    return this.statusRepository.findOneBy({ Id: id });
  }

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const status = new Status();
    status.Code = createStatusDto.Code;
    status.Name = createStatusDto.Name;

    return this.statusRepository.save(status);
  }
}
