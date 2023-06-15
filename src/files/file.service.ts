// file.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { File } from './file.entity';
import { CreateFileDto } from './Dto/create-file.dto';
import { Folder } from 'src/folders/folder.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,

    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  async findRootFile(): Promise<File[]> {
    return this.fileRepository.find({
      where: {
        Folder: null,
      },
    });
  }
  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  async findById(id: string): Promise<File> {
    return this.fileRepository.findOneBy({ Id: id });
  }

  async findByParent(id: string): Promise<File> {
    return this.fileRepository.findOneBy({ Folder: Equal(id) });
  }

  async create(createFileDto: CreateFileDto): Promise<File> {
    const file = new File();
    file.Name = createFileDto.Name;
    file.Size = createFileDto.Size;
    file.Content = createFileDto.Content;
    file.FileType = createFileDto.FileType;
    file.Folder = await this.folderRepository.findOneBy({
      Id: createFileDto.FolderId,
    });
    return this.fileRepository.save(file);
  }

  async update(
    fileId: string,
    query: any,
    createFileDto: CreateFileDto,
  ): Promise<File> {
    const file = await this.fileRepository.findOneBy({
      Id: fileId,
    });

    if (query?.rename) {
      file.Name = createFileDto.Name;
    } else {
      file.Name = createFileDto.Name;
      file.Folder = await this.folderRepository.findOneBy({
        Id: createFileDto.FolderId,
      });
    }

    return this.fileRepository.save(file);
  }

  async delete(id: string): Promise<void> {
    await this.fileRepository.delete(id);
  }
}
