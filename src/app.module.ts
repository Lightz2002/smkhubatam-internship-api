import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'vultr-prod-33b12f70-1976-45ef-94c5-338273d046a8-vultr-prod-0e34.vultrdb.com',
      port: 16751,
      username: 'vultradmin',
      password: 'AVNS_0JExuKG2MZHks3EIzHq',
      database: 'smkhu',
      entities: [User, Role],
      synchronize: false, // set false in production,
      autoLoadEntities: true,
    }),
    RolesModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
