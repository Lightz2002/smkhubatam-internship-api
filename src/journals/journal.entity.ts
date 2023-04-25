import { Location } from 'src/locations/location.entity';
import { Status } from 'src/status/status.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Date: Date;

  @Column()
  Absence: string;

  @Column('longtext')
  AbsenceNote: string;

  @Column('longtext')
  Note: string;

  @ManyToOne(() => Status, { eager: true })
  @JoinColumn({ name: 'Status' })
  Status: Status;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'Student' })
  Student: User;

  @ManyToOne(() => Location, (location) => location.Journals, { eager: true })
  @JoinColumn({ name: 'Location' })
  Location: Location;
}
