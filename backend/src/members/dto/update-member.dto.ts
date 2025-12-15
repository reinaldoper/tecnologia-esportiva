import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, Length, IsInt } from 'class-validator';

export class UpdateMemberDto {
  @ApiProperty({
    example: 'Maria Souza',
    description: 'Nome atualizado do sócio',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  nome?: string;

  @ApiProperty({
    example: 'maria.souza@email.com',
    description: 'Email atualizado',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '(67) 98888-7777',
    description: 'Telefone atualizado',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(8, 20)
  telefone?: string;

  @ApiProperty({
    example: 2,
    description: 'Novo ID do plano',
    required: false,
  })
  @IsOptional()
  @IsInt()
  planoId?: number;

  @ApiProperty({
    example: 3,
    description: 'Novo ID do afiliado',
    required: false,
  })
  @IsOptional()
  @IsInt()
  affiliateId?: number;
}
