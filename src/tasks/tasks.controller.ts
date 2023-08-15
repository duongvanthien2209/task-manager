import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskSevice: TasksService) {}

  @Get('/:id')
  getTaskByID(@Param('id') id?: string) {
    return this.taskSevice.getTaskByID(id);
  }

  @Post('')
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    console.log(user);
    return this.taskSevice.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    const { status } = updateTaskStatusDto;
    console.log(id, status);

    return this.taskSevice.updateTaskStatus(id, status);
  }
}
