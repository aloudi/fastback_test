import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RefreshGuard } from 'src/guards/refresh.guard';
import { User } from 'src/decorators';
import {
  RefreshResponseDTO,
  UserLoginDTO,
  UserLoginResponseDTO,
} from './types';
import { UserDTO } from '../users/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: UserLoginResponseDTO })
  @Post('login')
  async login(@Body() user: UserLoginDTO): Promise<UserLoginResponseDTO> {
    return this.authService.login(user);
  }

  @UseGuards(RefreshGuard)
  @ApiTags('API')
  @ApiResponse({ status: 201, type: RefreshResponseDTO })
  @Post('refresh')
  async refresh(@User() user: UserDTO): Promise<RefreshResponseDTO> {
    return this.authService.refresh(user);
  }
}
