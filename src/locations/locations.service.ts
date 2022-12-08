import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './Dto/create-location.dto';
import { Location } from './location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  findOne(id: string): Promise<Location> {
    return this.locationRepository.findOneBy({ Id: id });
  }

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = new Location();
    location.Code = createLocationDto.Code;
    location.Name = createLocationDto.Name;
    location.Image = createLocationDto.Image;

    return this.locationRepository.save(location);
  }
}
