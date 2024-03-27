import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import PostModel from 'src/models/post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [SequelizeModule.forFeature([PostModel])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
