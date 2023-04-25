import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Major } from 'src/majors/major.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class SchoolClass {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Code: number;

  @Column()
  StudentCount: number;

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

  @OneToMany(() => User, (user) => user.SchoolClass)
  Users: User[];

  @ManyToOne(() => Major, (major) => major.SchoolClasses, { eager: true })
  @JoinColumn({ name: 'Major' })
  Major: Major;

  @Column({ default: null, type: 'year' })
  Year: Date;
}
