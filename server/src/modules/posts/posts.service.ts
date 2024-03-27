import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import PostModel from 'src/models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel) private readonly postModel: typeof PostModel,
  ) {}

  async createPost(post: any): Promise<PostModel> {
    return this.postModel.create(post);
  }

  deletePost(postId: string) {
    return this.postModel.destroy({ where: { id: postId } });
  }

  async getPostById(postId: string): Promise<PostModel> {
    return this.postModel.findByPk(postId);
  }

  async getUserPosts(userId: string): Promise<PostModel[]> {
    return this.postModel.findAll({ where: { userId } });
  }
}
