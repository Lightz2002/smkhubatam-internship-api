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
import { LocationsModule } from './locations/locations.module';
import { Location } from './locations/location.entity';
import { InternshipsModule } from './internships/internships.module';
import { StatusModule } from './status/status.module';
import { JournalsModule } from './journals/journals.module';
import { Journal } from './journals/journal.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-mysql-sgp1-smkhu-do-user-13058725-0.b.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_hTrqzGvEuAyb03GGyFE',
      database: 'smkhu',
      entities: [User, Role, Major, SchoolClass, Location, Journal],
      synchronize: false, // set false in production,
      autoLoadEntities: true,
    }),
    RolesModule,
    MenuModule,
    SchoolClassesModule,
    MajorsModule,
    LocationsModule,
    InternshipsModule,
    StatusModule,
    JournalsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
