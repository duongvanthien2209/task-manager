import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_REPOSITORY') private authRepository: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const user = this.authRepository.create({
      id: uuid(),
      username,
      password,
    });

    return this.authRepository.save(user);
  }
}
