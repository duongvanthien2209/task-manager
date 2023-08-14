import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Task {
  @ObjectIdColumn()
  _id: ObjectId;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;
}
