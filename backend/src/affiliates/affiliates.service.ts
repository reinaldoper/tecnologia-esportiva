import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';

@Injectable()
export class AffiliatesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAffiliateDto) {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { codigo: dto.codigo },
    });
    if (affiliate) {
      throw new NotFoundException('Código de afiliado duplicado');
    }
    return this.prisma.affiliate.create({
      data: {
        nome: dto.nome,
        codigo: dto.codigo,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.affiliate.findMany({
        skip,
        take: limit,
        include: { membersIndicados: true },
      }),
      this.prisma.affiliate.count(),
    ]);

    return {
      data: data.map((a) => ({
        id: a.id,
        nome: a.nome,
        codigo: a.codigo,
        totalIndicados: a.membersIndicados.length,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { id },
      include: { membersIndicados: true },
    });
    if (!affiliate) {
      throw new NotFoundException('Afiliado não encontrado');
    }
    return affiliate;
  }

  async update(id: number, dto: UpdateAffiliateDto) {
    await this.findOne(id);
    return this.prisma.affiliate.update({
      where: { id },
      data: {
        nome: dto.nome,
        codigo: dto.codigo,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.affiliate.delete({
      where: { id },
    });
  }

  async countMembers(id: number) {
    const affiliate = await this.findOne(id);
    return {
      affiliateId: id,
      nome: affiliate.nome,
      totalIndicados: affiliate.membersIndicados.length,
    };
  }

  async ranking() {
    const affiliates = await this.prisma.affiliate.findMany({
      include: { membersIndicados: true },
    });

    return affiliates
      .map((a) => ({
        id: a.id,
        nome: a.nome,
        codigo: a.codigo,
        totalIndicados: a.membersIndicados.length,
      }))
      .sort((a, b) => b.totalIndicados - a.totalIndicados);
  }
}
