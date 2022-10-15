import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './Dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get()
  async getRoles() {
    return await this.roleService.findAll();
  }

  @Get(':roleId')
  async getRole(@Param('roleId') roleId) {
    return await this.roleService.findOne(roleId);
  }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }
}
