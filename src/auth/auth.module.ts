import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database.module';
import { authProviders } from './auth.providers';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [...authProviders, AuthResolver, AuthService],
})
export class AuthModule {}
