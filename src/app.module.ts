import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LessonModule } from './lesson/lesson.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb+srv://duongvanthienbkhoa:thien3324@cluster0.dwvhdlu.mongodb.net/?retryWrites=true&w=majority',
    //   synchronize: true,
    //   useUnifiedTopology: true,
    //   entities: [Lesson],
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    LessonModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
