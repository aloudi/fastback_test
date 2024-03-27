import { IsEmail, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenDTO {
  @IsUUID()
  @IsString()
  id: string;

  @IsEmail()
  email: string;
}

export class JwtPayloadDTO {
  @ApiProperty()
  sub: string;
}
