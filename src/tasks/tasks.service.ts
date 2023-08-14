import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
  constructor(@Inject('TASKS_REPOSITORY') private tasksRepository: Repository<Task>) {}

  async getTaskByID(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { _id: new ObjectId(id) } });

    if (!task) throw new NotFoundException(`The task with ID ${id} is not found`);

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    const task = await this.getTaskByID(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  // private tasks: Task[] = [];
  //
  // getAllTask() {
  //   return this.tasks;
  // }
  //
  // getTasks(getTasksFilterDto: GetTasksFilterDto) {
  //   const { status, search } = getTasksFilterDto;
  //   let tasks = this.getAllTask();
  //
  //   if (status) {
  //     tasks = tasks.filter((item) => item.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter((item) => item.title.includes(search) || item.description.includes(search));
  //   }
  //
  //   return tasks;
  // }
  //
  // getTaskByID(id: string) {
  //   const task = this.tasks.find((item) => item.id === id);
  //
  //   if (!task) {
  //     throw new NotFoundException(`The task with ID ${id} is not found`);
  //   }
  //
  //   return task;
  // }
}
