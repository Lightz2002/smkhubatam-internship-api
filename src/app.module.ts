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
import { Folder } from './folders/folder.entity';
import { File } from './files/file.entity';
import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folder.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Add ConfigModule to the imports array
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: 'smkhu',
        entities: [
          User,
          Role,
          Major,
          SchoolClass,
          Location,
          Journal,
          File,
          Folder,
        ],
        synchronize: false, // set false in production,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    RolesModule,
    MenuModule,
    SchoolClassesModule,
    MajorsModule,
    LocationsModule,
    InternshipsModule,
    StatusModule,
    JournalsModule,
    FilesModule,
    FoldersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
