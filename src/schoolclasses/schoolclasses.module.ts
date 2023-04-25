import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClassesService } from './schoolclasses.service';
import { SchoolClass } from './schoolclass.entity';
import { SchoolClassesController } from './schoolclasses.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Major } from 'src/majors/major.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolClass, Major])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SchoolClassesService,
  ],
  controllers: [SchoolClassesController],
  exports: [TypeOrmModule],
})
export class SchoolClassesModule {}
