import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from '../database.module';
import { tasksProviders } from './tasks.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [...tasksProviders, TasksService],
})
export class TasksModule {}
