import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from 'src/roles/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: string;

  @Column()
  Username: string;

  @Column()
  Name: string;

  @Column()
  Password: string;

  @OneToOne(() => Role, (role) => role.User)
  @JoinColumn()
  Role: Role;

  @Column({ default: true })
  IsActive: boolean;
}
