import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Role } from 'src/roles/role.entity';
import { SchoolClass } from 'src/schoolclasses/schoolclass.entity';
import { Journal } from 'src/journals/journal.entity';
import { Internship } from 'src/internships/internship.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Username: string;

  @Column()
  Name: string;

  @Column()
  Gender: string;

  @Column({ default: null })
  Age: number;

  @Column()
  Password: string;

  @Column({ default: null })
  BirthPlace: string;

  @OneToMany(() => Journal, (journal) => journal.Student)
  @JoinColumn({ name: 'JournalId' })
  Journal: Journal;

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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  Created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  Updated_at: Date;

  @Column({ default: null, type: 'year' })
  YearEntered: Date;

  @Column({ default: null, type: 'date' })
  BirthDate: Date;

  @Column({ default: null, type: 'longtext' })
  Image: string;

  @OneToOne(() => Internship, (internship) => internship.Student, {
    cascade: true,
  })
  @JoinColumn({ name: 'InternshipId' })
  Internship: Internship;
}
