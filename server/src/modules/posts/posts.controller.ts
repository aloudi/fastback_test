import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/modules/users/types';
import { Firewall, User } from 'src/decorators';
import { PostsService } from './posts.service';
import { CreatePostDTO, DeletePostDTO, PostResponseDTO } from './types';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiTags('API')
  @Firewall()
  @Post('create')
  createPost(@Body() post: CreatePostDTO) {
    return this.postsService.createPost(post);
  }

  @ApiTags('API')
  @Firewall()
  @Delete('delete')
  deletePost(@Body() payload: DeletePostDTO) {
    return this.postsService.deletePost(payload.postId);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: PostResponseDTO })
  @Firewall()
  @Get('get')
  getPostById(@Query('postId') postId: string): Promise<PostResponseDTO> {
    return this.postsService.getPostById(postId);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: [PostResponseDTO] })
  @Firewall()
  @Get('get-all')
  getAllUserPosts(@User() user: UserDTO): Promise<PostResponseDTO[]> {
    return this.postsService.getUserPosts(user.id);
  }
}
