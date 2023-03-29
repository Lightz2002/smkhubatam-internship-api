import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './Dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get(':userId')
  async getUser(@Param('userId') userId) {
    return await this.userService.findOne(userId);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':userId')
  async updateUser(@Body() createUserDto: CreateUserDto, userId: string) {
    return await this.userService.update(createUserDto, userId);
  }
}
