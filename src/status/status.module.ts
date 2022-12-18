import { Module } from '@nestjs/common';
import { Status } from './status.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    StatusService,
  ],
  exports: [TypeOrmModule],
  controllers: [StatusController],
})
export class StatusModule {}
