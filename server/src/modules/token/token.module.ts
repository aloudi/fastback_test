import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService, ConfigService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
