import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePlanDto) {
    return this.prisma.plan.create({
      data: {
        nome: dto.nome,
        precoMensal: dto.precoMensal,
        beneficios: dto.beneficios,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.plan.findMany({
        skip,
        take: limit,
        include: { members: true },
      }),
      this.prisma.plan.count(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!plan) {
      throw new NotFoundException('Plano não encontrado');
    }
    return plan;
  }

  async update(id: number, dto: UpdatePlanDto) {
    await this.findOne(id);
    return this.prisma.plan.update({
      where: { id },
      data: {
        nome: dto.nome,
        precoMensal: dto.precoMensal,
        beneficios: dto.beneficios,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.plan.delete({
      where: { id },
    });
  }
}
