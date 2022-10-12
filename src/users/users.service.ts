/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/roles/role.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./Dto/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleRepository: Repository<Role>
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ Id: id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.roleRepository.findOneBy({ Id: createUserDto.Role });

    const user = new User();
    user.Name = createUserDto.Name;
    user.Username = createUserDto.Username;
    user.Password = createUserDto.Password;
    user.Role = role;
    user.IsActive = createUserDto.IsActive;

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
