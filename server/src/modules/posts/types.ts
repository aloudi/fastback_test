import { IsEmail, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDTO {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsEmail()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;
}

export class DeletePostDTO {
  @ApiProperty()
  @IsUUID()
  postId: string;
}

export class PostResponseDTO {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;
}
