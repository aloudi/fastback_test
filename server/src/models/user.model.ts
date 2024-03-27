import {
  Column,
  CreatedAt,
  Default,
  DefaultScope,
  DeletedAt,
  HasMany,
  IsEmail,
  IsUUID,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import Post from './post.model';

export enum UserScope {
  FullScope = 'FullScope',
}

@DefaultScope(() => ({
  attributes: {
    exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
  },
}))
@Scopes(() => ({
  [UserScope.FullScope]: {
    attributes: {
      exclude: [],
    },
  },
}))
@Table({
  modelName: 'User',
  timestamps: true,
  paranoid: true,
  tableName: 'Users',
})
export default class User extends Model<User, Partial<User>> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuidv4)
  @Column
  id: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Post)
  posts: Post[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date | null;
}
