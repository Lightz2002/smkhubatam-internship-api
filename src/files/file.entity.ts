import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Folder } from '../folders/folder.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Name: string;

  @Column()
  Size: number;

  @Column()
  FileType: string;

  @Column({ type: 'longtext', nullable: true })
  Content: string;

  @ManyToOne(() => Folder, (folder) => folder.Files)
  @JoinColumn({ name: 'FolderId' })
  Folder: Folder;
}
