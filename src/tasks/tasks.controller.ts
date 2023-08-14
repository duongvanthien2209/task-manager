import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskSevice: TasksService) {}

  @Get('/:id')
  getTaskByID(@Param('id') id?: string) {
    return this.taskSevice.getTaskByID(id);
  }

  @Post('')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskSevice.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    const { status } = updateTaskStatusDto;
    console.log(id, status);

    return this.taskSevice.updateTaskStatus(id, status);
  }
}
