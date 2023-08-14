import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(@Inject('LESSON_REPOSITORY') private lessonRepository: Repository<Lesson>) {}

  async createLesson(lessonInput: CreateLessonInput) {
    const { name, startDate, endDate } = lessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });

    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: string) {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

    if (!id) {
      throw new NotFoundException();
    }

    return lesson;
  }
}
