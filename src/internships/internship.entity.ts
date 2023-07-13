import { Location } from 'src/locations/location.entity';
import { User } from 'src/users/user.entity';
import { Status } from 'src/status/status.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Internship {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column({ default: null, type: 'year' })
  Year: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'Student' })
  Student: User;

  @ManyToOne(() => Location, { eager: true })
  @JoinColumn({ name: 'Location' })
  Location: Location;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'FieldMentor' })
  FieldMentor: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'SchoolMentor' })
  SchoolMentor: User;

  @ManyToOne(() => Status, { eager: true })
  @JoinColumn({ name: 'Status' })
  Status: Status;

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
}
