import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  BadRequestException,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AffiliatesService } from './affiliates.service';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Affiliates')
@Controller('affiliates')
export class AffiliatesController {
  constructor(private readonly affiliatesService: AffiliatesService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar um novo afiliado' })
  @ApiResponse({ status: 201, description: 'Afiliado criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() dto: CreateAffiliateDto) {
    return this.affiliatesService.create(dto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os afiliados com paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de afiliados retornada com sucesso.',
  })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.affiliatesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Buscar afiliado por ID' })
  @ApiResponse({ status: 200, description: 'Afiliado encontrado.' })
  @ApiResponse({ status: 404, description: 'Afiliado não encontrado.' })
  async findOne(@Param('id') id: string) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    return this.affiliatesService.findOne(Number(id));
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar dados de um afiliado' })
  @ApiResponse({ status: 200, description: 'Afiliado atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Afiliado não encontrado.' })
  async update(@Param('id') id: string, @Body() dto: UpdateAffiliateDto) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    return this.affiliatesService.update(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir um afiliado' })
  @ApiResponse({ status: 204, description: 'Afiliado excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Afiliado não encontrado.' })
  async remove(@Param('id') id: string) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    await this.affiliatesService.remove(Number(id));
    return;
  }

  @Get(':id/members-count')
  @HttpCode(200)
  @ApiOperation({ summary: 'Contar quantos sócios um afiliado indicou' })
  @ApiResponse({
    status: 200,
    description: 'Total de membros indicados retornado.',
  })
  async countMembers(@Param('id') id: string) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    return this.affiliatesService.countMembers(Number(id));
  }

  @Get('ranking/list')
  @HttpCode(200)
  @ApiOperation({ summary: 'Ranking de afiliados por número de indicações' })
  @ApiResponse({ status: 200, description: 'Ranking retornado com sucesso.' })
  async ranking() {
    return this.affiliatesService.ranking();
  }
}
