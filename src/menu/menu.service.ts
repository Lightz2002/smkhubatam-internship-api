import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './Dto/create-menu.dto';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,
  ) {}

  findAll(): Promise<Menu[]> {
    return this.menusRepository.find();
  }

  findOne(id: string): Promise<Menu> {
    return this.menusRepository.findOneBy({ Id: id});
  }

  async create(CreateMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = new Menu();
    menu.Name = CreateMenuDto.Name;

    return this.menusRepository.save(menu);
  }

  async remove(id: string): Promise<void> {
    await this.menusRepository.delete(id);
  }
}
