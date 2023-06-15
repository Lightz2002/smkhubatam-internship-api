import { Put } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FileService } from './file.service';
import { File } from './file.entity';
import { CreateFileDto } from './Dto/create-file.dto';

@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get()
  findAll(): Promise<File[]> {
    return this.fileService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<File> {
    return this.fileService.findById(id);
  }

  @Post()
  create(@Body() createFileDto: CreateFileDto): Promise<File> {
    return this.fileService.create(createFileDto);
  }

  @Put(':fileId')
  async updateFile(
    @Param('fileId') fileId: string,
    @Query() query: any,
    @Body() createFileDto: CreateFileDto,
  ) {
    return await this.fileService.update(fileId, query, createFileDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.fileService.delete(id);
  }
}
