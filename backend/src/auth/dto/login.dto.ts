import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678900' })
  @Length(6, 11)
  @IsString()
  password: string;
}
