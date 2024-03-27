import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtPayloadDTO } from 'src/modules/token/types';
import UserModel from 'src/models/user.model';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Refresh'),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt_refresh_secret'),
    });
  }

  async validate(payload: JwtPayloadDTO): Promise<UserModel> {
    const user = await this.authService.validateJwtUser(payload);

    if (!user) {
      throw new UnauthorizedException(
        'Refresh token invalid or no user matches it',
      );
    }

    return user.get({ plain: true });
  }
}
