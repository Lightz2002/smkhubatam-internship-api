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
    
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ Id: id });
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ Username: username });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.rolesRepository.findOneBy({ Id: createUserDto.Role });

    const user = new User();
    user.Name = createUserDto.Name;
    user.Username = createUserDto.Username;
    user.Password = createUserDto.Password;
    user.Role = role;

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
