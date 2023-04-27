import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Location } from 'src/locations/location.entity';
import { Status } from 'src/status/status.entity';
import { User } from 'src/users/user.entity';
import { Journal } from './journal.entity';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { Internship } from 'src/internships/internship.entity';
import { InternshipsService } from 'src/internships/internships.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Journal, Location, User, Status, Internship]),
  ],
  controllers: [JournalsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JournalsService,
    InternshipsService,
  ],
  exports: [TypeOrmModule],
})
export class JournalsModule {}
