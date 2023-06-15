import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { FileService } from 'src/files/file.service';
import { CreateFolderDto } from './Dto/create-folder.dto';

@Controller('folder')
export class FolderController {
  constructor(
    private folderService: FolderService,
    private fileService: FileService,
  ) {}

  @Get()
  async findAll() {
    return await this.folderService.findAll();
  }

  @Get('root')
  async getRootFolder() {
    const rootFolder = await this.folderService.findRootFolder();
    const rootFiles = await this.fileService.findRootFile();

    return {
      folders: rootFolder,
      files: rootFiles,
    };
  }

  @Get(':folderId')
  async findOne(@Param('folderId') folderId) {
    return await this.folderService.findOne(folderId);
  }

  @Post()
  async createFolder(@Body() createFolderDto: CreateFolderDto) {
    return await this.folderService.create(createFolderDto);
  }

  @Put(':folderId')
  async updateFolder(
    @Param('folderId') folderId: string,
    @Query() query: any,
    @Body() createFolderDto: CreateFolderDto,
  ) {
    return await this.folderService.update(folderId, query, createFolderDto);
  }
}
