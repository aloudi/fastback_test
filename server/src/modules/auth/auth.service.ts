import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';
import { TokenService } from 'src/modules/token/token.service';
import { ERROR_MESSAGES } from 'src/constants';
import { JwtPayloadDTO } from 'src/modules/token/types';
import {
  UserLoginDTO,
  UserLoginResponseDTO,
  RefreshResponseDTO,
} from './types';
import UserModel from '../../models/user.model';
import { UserDTO } from '../users/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(user: UserLoginDTO): Promise<UserLoginResponseDTO> {
    try {
      const existingUser = await this.usersService.findUserByEmail(user.email);
      if (!existingUser) {
        throw new BadRequestException(ERROR_MESSAGES.USER_NOT_FOUND);
      }
      const validatePassword = await bcrypt.compare(
        user.password,
        existingUser.password,
      );
      if (!validatePassword) {
        throw new BadRequestException(ERROR_MESSAGES.INVALID_DATA);
      }

      const accessToken =
        await this.tokenService.generateAccessToken(existingUser);
      const refreshToken =
        await this.tokenService.generateRefreshToken(existingUser);
      const expiresIn = new Date().setTime(
        new Date().getTime() +
          Number(this.configService.get('jwt_access_expires_in')),
      );

      return {
        user: {
          id: existingUser.id,
          email: existingUser.email,
        },
        backendTokens: {
          accessToken,
          refreshToken,
          expiresIn: new Date(expiresIn),
        },
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async validateJwtUser(
    payload: JwtPayloadDTO,
  ): Promise<UserModel | null> {
    return this.usersService.findUserById(payload.sub);
  }

  async refresh(user: UserDTO): Promise<RefreshResponseDTO> {
    try {
      if (!user) {
        throw new BadRequestException(ERROR_MESSAGES.USER_NOT_FOUND);
      }

      const accessToken = await this.tokenService.generateAccessToken(user);
      const refreshToken = await this.tokenService.generateRefreshToken(user);
      const expiresIn = new Date().setTime(
        new Date().getTime() +
          Number(this.configService.get('jwt_access_expires_in')),
      );

      return {
        backendTokens: {
          accessToken,
          refreshToken,
          expiresIn: new Date(expiresIn),
        },
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
