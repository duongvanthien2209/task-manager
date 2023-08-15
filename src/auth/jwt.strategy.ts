import { Repository } from 'typeorm';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_REPOSITORY') private authRepository: Repository<User>) {
    super({
      secretOrKey: 'exampleSecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;

    const user = await this.authRepository.findOne({ where: { username } });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
