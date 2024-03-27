import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, description: 'User created' })
  @Post('create')
  createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }
}
