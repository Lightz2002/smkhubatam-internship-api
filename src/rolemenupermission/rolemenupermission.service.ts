import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/menu/menu.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RolemenuPermission } from './rolemenupermission.entity';

@Injectable()
export class RolemenupermissionService {
  constructor(
    @InjectRepository(RolemenuPermission)
    private rolemenuPermissionRepository: Repository<RolemenuPermission>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async findOne(request): Promise<RolemenuPermission> {
    const user = await this.userRepository.findOneBy({ Id: request.user.id});
    // const menu = await this.menuRepository.find();
    console.log(user.Role);

    return this.rolemenuPermissionRepository.findOneBy({ Role: user.Role });
  }
}
