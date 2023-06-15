import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { Role } from 'src/roles/role.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SchoolClass } from 'src/schoolclasses/schoolclass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, SchoolClass])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    UsersService,
  ],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
