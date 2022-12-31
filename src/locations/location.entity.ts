import { Journal } from 'src/journals/journal.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => Journal, (journal) => journal.Location)
  Journals: Journal[]
}
