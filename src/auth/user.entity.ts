import {Task} from 'src/tasks/task.entity'
import{Entity , PrimaryGeneratedColumn , Column , OneToMany} from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string ;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    //database Realation
    @OneToMany (type => Task, task => task.user, {eager: true})    // make a relation one to many (one user for many tasks) 
    tasks: Task[] ;          
    //eager set it to true it means when i retrieve user from database i retvieve tasks
    
}