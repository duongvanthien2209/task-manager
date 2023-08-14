import { DataSource } from 'typeorm';
import { Task } from './task.entity';

export const tasksProviders = [
  {
    provide: 'TASKS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];
