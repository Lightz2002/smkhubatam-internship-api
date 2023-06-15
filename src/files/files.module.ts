import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './file.entity';
import { Folder } from '../folders/folder.entity';
import { FolderService } from 'src/folders/folder.service';

@Module({
  imports: [TypeOrmModule.forFeature([File, Folder])],
  controllers: [FileController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    FileService,
    FolderService,
  ],
  exports: [TypeOrmModule],
})
export class FilesModule {}
