import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './Dto/create-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  findOne(id: string): Promise<Role> {
    return this.rolesRepository.findOneBy({ Id: id });
  }

  async findRolemenu(userId: string): Promise<any> {
    const rolemenus = await this.rolesRepository
      .createQueryBuilder('role')
      .leftJoin('role.Users', 'User')
      .leftJoinAndSelect('role.Menus', 'Menu')
      .where('User.id = :userId', { userId: userId })
      .getOne();

    return rolemenus;
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new Role();
    role.Code = createRoleDto.Code;
    role.Name = createRoleDto.Name;

    return this.rolesRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
