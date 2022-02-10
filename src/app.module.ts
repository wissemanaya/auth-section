import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/TypeOrm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({              // database config with typeOrm
      type: 'postgres',            
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,           // load entities (tables) automatically 
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
