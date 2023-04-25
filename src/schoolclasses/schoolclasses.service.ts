/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolClass } from './schoolclass.entity';
import { CreateSchoolClassDto } from './Dto/create-schoolclass.dto';
import { Major } from 'src/majors/major.entity';

@Injectable()
export class SchoolClassesService {
  constructor(
    @InjectRepository(SchoolClass)
    private schoolClassesRepository: Repository<SchoolClass>,

    @InjectRepository(Major)
    private majorsRepository: Repository<Major>,
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
    const major = await this.majorsRepository.findOneBy({
      Id: createSchoolClassDto.Major,
    });

    schoolClass.Code = createSchoolClassDto.Code;
    schoolClass.IsActive = createSchoolClassDto.IsActive;
    schoolClass.Year = createSchoolClassDto.Year;
    schoolClass.Major = major;

    return this.schoolClassesRepository.save(schoolClass);
  }

  async update(
    createSchoolClassDto: CreateSchoolClassDto,
    schoolClassId: string,
  ): Promise<SchoolClass> {
    const schoolClass = await this.schoolClassesRepository.findOneBy({
      Id: schoolClassId,
    });

    const major = await this.majorsRepository.findOneBy({
      Id: createSchoolClassDto.Major,
    });

    schoolClass.Code = createSchoolClassDto.Code;
    schoolClass.IsActive = createSchoolClassDto.IsActive;
    schoolClass.Year = createSchoolClassDto.Year;
    schoolClass.Major = major;

    return this.schoolClassesRepository.save(schoolClass);
  }

  async remove(id: string): Promise<void> {
    await this.schoolClassesRepository.delete(id);
  }
}
