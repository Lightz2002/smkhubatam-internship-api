import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SchoolClass } from 'src/schoolclasses/schoolclass.entity';
@Entity()
export class Major {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Code: string;

  @Column()
  Name: string;

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

  @OneToMany(() => SchoolClass, (schoolClass) => schoolClass.Major)
  SchoolClasses: SchoolClass[];
}
