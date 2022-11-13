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

  async findRolemenu(): Promise<any> {
    console.log(111);
    const rolemenus = await this.rolesRepository
      .createQueryBuilder('role')
      .leftJoin('Menu.Roles', 'Role')
      .getOne();

    console.log(rolemenus);
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
