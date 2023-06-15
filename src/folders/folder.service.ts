import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './folder.entity';
import { Equal, IsNull, Repository } from 'typeorm';
import { CreateFolderDto } from './Dto/create-folder.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  findOne(id: string): Promise<Folder> {
    return this.folderRepository.findOne({
      where: {
        Id: id,
      },
      relations: ['Files', 'Children'],
    });
  }

  async findAll(): Promise<Folder[]> {
    return this.folderRepository.find();
  }

  async findRootFolder(): Promise<Folder[]> {
    return this.folderRepository.find({
      where: {
        Parent: IsNull(),
      },
    });
  }

  async findChildFolder(id: string): Promise<Folder[]> {
    return this.folderRepository.find({
      where: {
        Parent: Equal(id),
      },
    });
  }

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    const folder = new Folder();
    folder.Name = createFolderDto.Name;
    // Assuming you have a service or method to retrieve the parent folder by its ID
    if (createFolderDto.Parent === undefined) {
      folder.Parent = null;
    } else {
      folder.Parent = await this.folderRepository.findOneBy({
        Id: createFolderDto.Parent,
      });
    }

    return this.folderRepository.save(folder);
  }

  async update(
    folderId: string,
    query: any,
    createFolderDto: CreateFolderDto,
  ): Promise<Folder> {
    const folder = await this.folderRepository.findOneBy({
      Id: folderId,
    });

    if (query?.rename) {
      folder.Name = createFolderDto.Name;
    } else {
      folder.Name = createFolderDto.Name;
      folder.Parent = await this.folderRepository.findOneBy({
        Id: createFolderDto.Parent,
      });
    }

    return this.folderRepository.save(folder);
  }
}
