import { Internship } from './../internships/internship.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Code: string;

  @Column()
  Name: string;

  @Column({ default: null, type: 'longtext' })
  Image: string;

  @OneToMany(() => Internship, (internship) => internship.Location)
  Internships: Internship[];
}
