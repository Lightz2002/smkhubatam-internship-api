import { Role } from 'src/roles/role.entity';
import { Menu } from 'src/menu/menu.entity';
import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class RolemenuPermission {
  @Column()
  IsEdit: boolean;

  @Column()
  IsView: boolean;

  @Column()
  IsDelete: boolean;

  @ManyToOne(() => Role, (role) => role.Id)
  @PrimaryColumn()
  @JoinColumn({ name: 'Role' })
  Role: Role;

  @ManyToOne(() => Menu, (menu) => menu.Id)
  @PrimaryColumn()
  @JoinColumn({ name: 'Menu' })
  Menu: Menu;
}
