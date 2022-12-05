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
      host: 'vultr-prod-265558a6-b1b4-48f3-a474-110794166be1-vultr-prod-81ec.vultrdb.com',
      port: 16751,
      username: 'vultradmin',
      password: 'AVNS_eC7HAhH2DjsSC4Vdrs-',
      database: 'smkhu',
      entities: [User, Role, Major, SchoolClass],
      synchronize: true, // set false in production,
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
