import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, Length, IsInt } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do sócio-torcedor',
  })
  @IsString()
  @Length(3, 100)
  nome: string;

  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'Email válido e único',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '(67) 99999-8888',
    description: 'Telefone de contato',
  })
  @IsString()
  @Length(8, 20)
  telefone: string;

  @ApiProperty({
    example: 1,
    description: 'ID do plano associado',
  })
  @IsInt()
  planoId: number;

  @ApiProperty({
    example: 2,
    description: 'ID do afiliado que indicou (opcional)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  affiliateId?: number;
}
