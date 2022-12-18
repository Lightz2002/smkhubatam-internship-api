import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './Dto/create-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private locationService: LocationsService) {}

  @Get()
  async getLocations() {
    return await this.locationService.findAll();
  }

  @Get(':locationId')
  async getLocation(@Param('locationId') locationId) {
    return await this.locationService.findOne(locationId);
  }

  @Post()
  async createLocation(@Body() createLocationDto: CreateLocationDto) {
    return await this.locationService.create(createLocationDto);
  }
}
