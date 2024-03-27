import { IsDate, IsEmail, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class BackendTokensDTO {
  @IsString()
  @ApiProperty()
  accessToken: string;

  @IsString()
  @ApiProperty()
  refreshToken: string;

  @IsDate()
  @ApiProperty()
  expiresIn: Date;
}

export class UserInfoDTO {
  @IsString()
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}

export class UserLoginResponseDTO {
  @ApiProperty()
  user: UserInfoDTO;

  @ApiProperty()
  backendTokens: BackendTokensDTO;
}

export class RefreshDTO {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}

export class RefreshResponseDTO {
  @ApiProperty()
  backendTokens: BackendTokensDTO;
}
