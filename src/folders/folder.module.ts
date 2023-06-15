import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Folder } from '../folders/folder.entity';
import { File } from 'src/files/file.entity';
import { FileService } from 'src/files/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, File])],
  controllers: [FolderController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    FolderService,
    FileService,
  ],
  exports: [TypeOrmModule],
})
export class FoldersModule {}
