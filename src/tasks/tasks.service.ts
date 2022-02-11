import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { userInfo } from 'os';

@Injectable()                        //manage objects without thinking about the instantiation of them, because that is already managed by the injector
export class TasksService {
  //private tasks: Task[] = [];      //no need because we i'm going to store tasks in database
  constructor(
    @InjectRepository(TasksRepository)                 
    private tasksRepository: TasksRepository,          // object of repository
  ) {}
getTasks(filterDto:GetTasksFilterDto, user:User): Promise<Task[]>{
  return this.tasksRepository.getTask (filterDto , user) ;  //// to get all tasks just belongs to that user         
} 

  async getTaskById(id: string , user:User): Promise<Task> {
     const found = await this.tasksRepository.findOne({where:{id,user}});
     if (!found){
      throw new NotFoundException (`task with ID"${id}not found`) ;
     }
     return found;
   }

  createTask(createTaskDto: CreateTaskDto , user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user) ;
   }


   async deleteTask(id: string , user:User): Promise<void> {
    const result = await this.tasksRepository.delete({id,user}) ;
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    
  }

  async updateTaskStatus(id: string, status: TaskStatus , user:User):Promise<Task> {
    const task = await this.getTaskById(id,user);  // when we call meth gettaskbyid we call pipes handling in that methode too
    task.status = status;                       
    await this.tasksRepository.save(task);
    return task;
  }



}
