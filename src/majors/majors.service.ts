/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Major } from './major.entity';
import { CreateMajorDto } from './Dto/create-major.dto';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(Major)
    private majorsRepository: Repository<Major>,
  ) {}

  findAll(): Promise<Major[]> {
    return this.majorsRepository.find();
  }

  findOne(id: string): Promise<Major> {
    return this.majorsRepository.findOneBy({ Id: id });
  }

  async create(createMajorDto: CreateMajorDto): Promise<Major> {
    const major = new Major();
    major.Name = createMajorDto.Name;
    major.Code = createMajorDto.Code;
    major.IsActive = createMajorDto.IsActive;

    return this.majorsRepository.save(major);
  }

  async remove(id: string): Promise<void> {
    await this.majorsRepository.delete(id);
  }
}
