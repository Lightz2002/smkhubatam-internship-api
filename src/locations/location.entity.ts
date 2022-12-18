import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Code: string;

  @Column()
  Name: string;

  @Column('longtext')
  Image: string;
}
