import { Location } from 'src/locations/location.entity';
import { User } from 'src/users/user.entity';
import { Status } from 'src/status/status.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Internship {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column({ default: null, type: 'year' })
  Year: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'Student'})
  Student: User;

  @OneToOne(() => Location)
  @JoinColumn({ name: 'Location'})
  Location: Location;

  @OneToOne(() => User)
  @JoinColumn({ name: 'Mentor'})
  Mentor: User;

  @OneToOne(() => Status)
  @JoinColumn({ name: 'Status'})
  Status: Status;
}
