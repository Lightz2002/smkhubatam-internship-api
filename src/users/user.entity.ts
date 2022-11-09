import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from 'src/roles/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Username: string;

  @Column()
  Name: string;

  @Column()
  Password: string;

  @ManyToOne(() => Role, (role) => role.Users, { eager: true })
  @JoinColumn({ name: 'Role' })
  Role: Role;

  @Column({ default: true })
  IsActive: boolean;

  @Column({ default: null, type: 'datetime' })
  Created_At?: Date;

  @Column({ default: null, type: 'datetime' })
  Updated_At?: Date;
}
