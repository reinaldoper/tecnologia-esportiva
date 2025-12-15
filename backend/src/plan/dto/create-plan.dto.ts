import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Length } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({
    example: 'Plano Ouro',
    description: 'Nome do plano',
  })
  @IsString()
  @Length(3, 100)
  nome: string;

  @ApiProperty({
    example: 99.9,
    description: 'Preço mensal do plano',
  })
  @IsNumber()
  precoMensal: number;

  @ApiProperty({
    example: 'Acesso a jogos exclusivos, descontos em produtos oficiais',
    description: 'Benefícios do plano (texto curto)',
  })
  @IsString()
  @Length(10, 300)
  beneficios: string;
}
