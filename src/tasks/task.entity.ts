// entity is a table in database
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from './task.model';
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid') //define a colum contain random id .. pass the uuid beacause typeeorm generate sequence id (1..2..3)
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  //database Realation
  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true }) // to hide user data when creating task
  user: User; // that let users own tasks qnd it helps when get all tasks just belongs to that user
}
