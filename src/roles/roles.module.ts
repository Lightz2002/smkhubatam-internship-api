import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { RolesController } from './roles.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    RolesService,
  ],
  exports: [TypeOrmModule],
  controllers: [RolesController],
})
export class RolesModule {}
