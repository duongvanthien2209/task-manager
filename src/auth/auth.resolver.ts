import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver((off) => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => UserType)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Mutation((returns) => UserType)
  signIn(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto);
  }
}
