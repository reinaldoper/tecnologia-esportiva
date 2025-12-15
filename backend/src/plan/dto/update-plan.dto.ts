import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Length } from 'class-validator';

export class UpdatePlanDto {
  @ApiProperty({
    example: 'Plano Prata',
    description: 'Nome atualizado do plano',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  nome?: string;

  @ApiProperty({
    example: 59.9,
    description: 'Preço mensal atualizado',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  precoMensal?: number;

  @ApiProperty({
    example: 'Acesso parcial a jogos e descontos limitados',
    description: 'Benefícios atualizados',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(10, 300)
  beneficios?: string;
}
