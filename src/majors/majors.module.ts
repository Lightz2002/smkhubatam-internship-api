import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorsService } from './majors.service';
import { Major } from './major.entity';
import { MajorsController } from './majors.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Major])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    MajorsService,
  ],
  controllers: [MajorsController],
  exports: [TypeOrmModule],
})
export class MajorsModule {}
