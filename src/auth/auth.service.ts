import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_REPOSITORY') private authRepository: Repository<User>, private jwtService: JwtService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.authRepository.create({
      id: uuid(),
      username,
      password: hashedPassword,
    });

    return this.authRepository.save(user);
  }

  async signIn(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.authRepository.findOne({ where: { username } });

    if (!user) throw new UnauthorizedException('Username is not exists');

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Password is not correct');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
