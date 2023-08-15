import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from '../auth/user.entity';

@Entity()
export class Task {
  @ObjectIdColumn()
  _id: ObjectId;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column((type) => User)
  user: User;
}
