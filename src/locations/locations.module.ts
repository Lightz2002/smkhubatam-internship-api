import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Location } from './location.entity';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    LocationsService,
  ],
  exports: [TypeOrmModule],
})
export class LocationsModule {}
