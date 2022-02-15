import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/TypeOrm';
import { AuthModule } from './auth/auth.module';
import { createConnection } from 'net';
import { User } from './auth/user.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
      "entities": [
        User,
        Task
     ],
    }),
    AuthModule,
  ],
})
export class AppModule {}
  