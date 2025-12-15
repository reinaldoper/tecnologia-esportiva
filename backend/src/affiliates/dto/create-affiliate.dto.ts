import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateAffiliateDto {
  @ApiProperty({
    example: 'Carlos Pereira',
    description: 'Nome do afiliado',
  })
  @IsString()
  @Length(3, 100)
  nome: string;

  @ApiProperty({
    example: 'ABC123',
    description: 'Código único do afiliado',
  })
  @IsString()
  @Length(3, 20)
  codigo: string;
}
