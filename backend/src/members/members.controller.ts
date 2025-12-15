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
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar um novo sócio-torcedor' })
  @ApiResponse({ status: 201, description: 'Sócio criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() dto: CreateMemberDto) {
    return this.membersService.create(dto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar sócios com paginação' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.membersService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Buscar sócio-torcedor por ID' })
  @ApiResponse({ status: 200, description: 'Sócio encontrado.' })
  @ApiResponse({ status: 404, description: 'Sócio não encontrado.' })
  async findOne(@Param('id') id: string) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    return this.membersService.findOne(Number(id));
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar dados de um sócio-torcedor' })
  @ApiResponse({ status: 200, description: 'Sócio atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Sócio não encontrado.' })
  async update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    return this.membersService.update(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir um sócio-torcedor' })
  @ApiResponse({ status: 204, description: 'Sócio excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Sócio não encontrado.' })
  async remove(@Param('id') id: string) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    await this.membersService.remove(Number(id));
    return;
  }
}
