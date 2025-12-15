import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678900' })
  @Length(6, 11)
  @IsString()
  password: string;

  @ApiProperty({ example: 'João Silva' })
  @Length(3, 100)
  @IsString()
  name: string;
}
