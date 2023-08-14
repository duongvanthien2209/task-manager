import { DataSource } from 'typeorm';
import { Task } from './tasks/task.entity';
import { Lesson } from './lesson/lesson.entity';
import { User } from './auth/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        url: 'mongodb+srv://duongvanthienbkhoa:thien3324@cluster0.dwvhdlu.mongodb.net/?retryWrites=true&w=majority',
        synchronize: true,
        useUnifiedTopology: true,
        entities: [Task, Lesson, User],
      });

      return dataSource.initialize();
    },
  },
];
