import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MenuController } from './menu.controller';
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    MenuService,
  ],
  exports: [TypeOrmModule],
})
export class MenuModule {}
