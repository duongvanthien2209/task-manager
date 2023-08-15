import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { ObjectId } from 'mongodb';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
