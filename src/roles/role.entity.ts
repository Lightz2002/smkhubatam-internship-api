import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  Id: string;

  @Column()
  Code: string;

  @Column()
  Name: string;

  @OneToOne(() => User, (user) => user.Role)
  User: User;
}
