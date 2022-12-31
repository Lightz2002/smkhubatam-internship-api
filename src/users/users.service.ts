/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

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
    const userExist = await this.usersRepository.findOneBy({
      Username: createUserDto.Username,
    });

    if (userExist !== null) throw new HttpException('Username already exist!', HttpStatus.NOT_ACCEPTABLE);

    const role = await this.rolesRepository.findOneBy({
      Code: createUserDto.Role,
    });
    const saltOrRounds = 10;
    const yearNow = new Date().getFullYear();
    const birthYear = new Date(createUserDto.BirthDate).getFullYear();

    const user = new User();
    user.Name = createUserDto.Name;
    user.Age = yearNow - birthYear; // createUserDto.Age;
    user.YearEntered = createUserDto.YearEntered;
    user.BirthDate = createUserDto.BirthDate;
    user.BirthPlace = createUserDto.BirthPlace;
    user.Gender = createUserDto.Gender;
    user.Username = createUserDto.Username;
    user.Password = await bcrypt.hash(createUserDto.Password, saltOrRounds);
    user.Role = role;

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
