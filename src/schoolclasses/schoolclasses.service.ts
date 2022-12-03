/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolClass } from './schoolclass.entity';
import { CreateSchoolClassDto } from './Dto/create-schoolclass.dto';

@Injectable()
export class SchoolClassesService {
  constructor(
    @InjectRepository(SchoolClass)
    private schoolClassesRepository: Repository<SchoolClass>,
  ) {}

  findAll(): Promise<SchoolClass[]> {
    return this.schoolClassesRepository.find();
  }

  findOne(id: string): Promise<SchoolClass> {
    return this.schoolClassesRepository.findOneBy({ Id: id });
  }

  async create(
    createSchoolClassDto: CreateSchoolClassDto,
  ): Promise<SchoolClass> {
    const schoolClass = new SchoolClass();
    schoolClass.Code = createSchoolClassDto.Code;
    schoolClass.IsActive = createSchoolClassDto.IsActive;

    return this.schoolClassesRepository.save(schoolClass);
  }

  async remove(id: string): Promise<void> {
    await this.schoolClassesRepository.delete(id);
  }
}
