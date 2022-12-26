import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @Column()
  Status: string;
}
