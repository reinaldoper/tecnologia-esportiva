import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateAffiliateDto {
  @ApiProperty({
    example: 'João Santos',
    description: 'Nome atualizado do afiliado',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  nome?: string;

  @ApiProperty({
    example: 'XYZ789',
    description: 'Novo código único do afiliado',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  codigo?: string;
}
