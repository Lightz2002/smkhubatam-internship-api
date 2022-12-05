import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { RolemenupermissionController } from './rolemenupermission.controller';
import { RolemenuPermission } from './rolemenupermission.entity';
import { RolemenupermissionService } from './rolemenupermission.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolemenuPermission, User])],
  controllers: [RolemenupermissionController],
  providers: [RolemenupermissionService],
  exports: [TypeOrmModule],
})
export class RolemenupermissionModule {}
