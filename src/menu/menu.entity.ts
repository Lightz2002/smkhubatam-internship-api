import { Role } from 'src/roles/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Name: string;

  @ManyToMany(() => Role, (role) => role.Menus)
  Roles: Role[];
}
