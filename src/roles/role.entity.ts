import { Menu } from 'src/menu/menu.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
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

  @OneToOne(() => User, (user) => user.Role)
  User: User;

  @ManyToMany(() => Menu, (menu) => menu.Roles)
  @JoinTable()
  Menus: Menu[];
}
