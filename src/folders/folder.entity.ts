import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { File } from '../files/file.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column({ nullable: false })
  Name: string;

  @ManyToOne(() => Folder, (folder) => folder.Children)
  @JoinColumn({ name: 'Parent' })
  Parent: Folder;

  @OneToMany(() => Folder, (folder) => folder.Parent)
  Children: Folder[];

  @OneToMany(() => File, (file) => file.Folder)
  Files: File[];
}
