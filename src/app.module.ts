import { SchoolClassesModule } from './schoolclasses/schoolclasses.module';
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
import { Major } from './majors/major.entity';
import { SchoolClass } from './schoolclasses/schoolclass.entity';
import { MajorsModule } from './majors/majors.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'remotemysql.com',
      port: 3306,
      username: 'IspLEEbCs8',
      password: 'cwWFdo11Z2',
      database: 'IspLEEbCs8',
      entities: [User, Role, Major, SchoolClass],
      synchronize: false, // set false in production,
      autoLoadEntities: true,
    }),
    RolesModule,
    MenuModule,
    SchoolClassesModule,
    MajorsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
