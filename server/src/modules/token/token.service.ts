import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GenerateTokenDTO, JwtPayloadDTO } from './types';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(user: GenerateTokenDTO) {
    const payload: JwtPayloadDTO = {
      sub: user.id,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt_access_secret'),
      expiresIn: `${this.configService.get('jwt_access_expires_in')}s`,
    });
  }

  async generateRefreshToken(user: GenerateTokenDTO) {
    const payload: JwtPayloadDTO = {
      sub: user.id,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt_refresh_secret'),
      expiresIn: this.configService.get('jwt_refresh_expires_in'),
    });
  }
}
