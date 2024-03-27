import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ERROR_MESSAGES } from 'src/constants';
import { hashPassword } from 'src/utils';
import UserModel, { UserScope } from 'src/models/user.model';
import { CreateUserDTO } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async createUser(user: CreateUserDTO): Promise<UserModel> {
    const existingUser = await this.findUserByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }
    const hashedPassword = await hashPassword(user.password);
    return this.userModel.create({
      ...user,
      password: hashedPassword,
    });
  }

  async findUserByEmail(email: string): Promise<UserModel> {
    return this.userModel.scope([UserScope.FullScope]).findOne({
      where: { email },
    });
  }

  async findUserById(userId: string): Promise<UserModel> {
    return this.userModel.findByPk(userId);
  }
}
