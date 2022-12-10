import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Location } from 'src/locations/location.entity';
import { Status } from 'src/status/status.entity';
import { User } from 'src/users/user.entity';
import { Internship } from './internship.entity';
import { InternshipsController } from './internships.controller';
import { InternshipsService } from './internships.service';

@Module({
  imports: [TypeOrmModule.forFeature([Internship, User, Location, Status])],
  controllers: [InternshipsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    InternshipsService,
  ],
  exports: [TypeOrmModule],
})
export class InternshipsModule {}
