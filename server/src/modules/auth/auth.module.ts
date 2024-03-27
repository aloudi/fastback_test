import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/modules/users/users.module';
import { TokenModule } from 'src/modules/token/token.module';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { RefreshStrategy } from 'src/strategies/refresh.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, TokenModule],
  providers: [AuthService, ConfigService, JwtStrategy, RefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
