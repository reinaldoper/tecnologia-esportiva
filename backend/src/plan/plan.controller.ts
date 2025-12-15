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
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Plan')
@Controller('plan')
export class PlanController {
  constructor(private readonly plansService: PlanService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar um novo plano' })
  @ApiResponse({ status: 201, description: 'Plano criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() dto: CreatePlanDto) {
    return this.plansService.create(dto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os planos com paginação' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Lista de planos retornada com sucesso.',
  })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.plansService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Buscar plano por ID' })
  @ApiResponse({ status: 200, description: 'Plano encontrado.' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado.' })
  async findOne(@Param('id') id: string) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    return this.plansService.findOne(Number(id));
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar um plano existente' })
  @ApiResponse({ status: 200, description: 'Plano atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado.' })
  async update(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    return this.plansService.update(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir um plano' })
  @ApiResponse({ status: 204, description: 'Plano excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado.' })
  async remove(@Param('id') id: string) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    await this.plansService.remove(Number(id));
    return;
  }
}
