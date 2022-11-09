import { Menu } from 'src/menu/menu.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Code: string;

  @Column()
  Name: string;

  @OneToMany(() => User, (user) => user.Role)
  Users: User[];

  @ManyToMany(() => Menu, (menu) => menu.Roles)
  @JoinTable()
  Menus: Menu[];
}
