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

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql6.freemysqlhosting.net',
      port: 3306,
      username: 'sql6525814',
      password: 'wZ6pXN2J9C',
      database: 'sql6525814',
      entities: [User, Role],
      synchronize: false, // set false in production,
      autoLoadEntities: true,
    }),
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
