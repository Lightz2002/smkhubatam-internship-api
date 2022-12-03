import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from 'src/roles/role.entity';
import { SchoolClass } from 'src/schoolclasses/schoolclass.entity';

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

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.Users, {
    eager: true,
  })
  @JoinColumn({ name: 'SchoolClass' })
  SchoolClass: SchoolClass;

  @Column({ default: true })
  IsActive: boolean;

  @Column({ default: null, type: 'datetime' })
  Created_At?: Date;

  @Column({ default: null, type: 'datetime' })
  Updated_At?: Date;
}
