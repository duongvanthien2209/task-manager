import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';
import { DatabaseModule } from '../database.module';
import { lessonProviders } from './lesson.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...lessonProviders, LessonResolver, LessonService],
})
export class LessonModule {}
