import {
  Column,
  CreatedAt,
  Default,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import User from './user.model';

@DefaultScope(() => ({
  attributes: {
    exclude: ['userId', 'createdAt', 'updatedAt', 'deletedAt'],
  },
}))
@Table({
  modelName: 'Post',
  timestamps: true,
  paranoid: true,
  tableName: 'Posts',
})
export default class Post extends Model<Post, Partial<Post>> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuidv4)
  @Column
  id: string;

  @ForeignKey(() => User)
  @IsUUID(4)
  @Column
  userId: string;

  @Column
  title: string;

  @Column
  text: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date | null;
}
