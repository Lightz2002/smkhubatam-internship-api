import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateMenuDto } from './Dto/create-menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  async getMenus() {
    return await this.menuService.findAll();
  }

  @Get(':menuId')
  async getMenu(@Param('menuId') menuId) {
    return await this.menuService.findOne(menuId);
  }

  @Post()
  async createMenu(@Body() CreateMenuDto: CreateMenuDto) {
    return await this.menuService.create(CreateMenuDto);
  }
}
