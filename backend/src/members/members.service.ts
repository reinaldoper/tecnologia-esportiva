import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMemberDto) {
    const { affiliateId } = dto;
    if (affiliateId) {
      const affiliate = await this.prisma.affiliate.findUnique({
        where: { id: affiliateId },
      });
      if (!affiliate) {
        throw new NotFoundException('Afiliado não encontrado');
      }
    }
    return this.prisma.member.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        telefone: dto.telefone,
        planoId: dto.planoId,
        affiliateId: dto.affiliateId,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.member.findMany({
        skip,
        take: limit,
        include: { plano: true, affiliate: true },
      }),
      this.prisma.member.count(),
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
    const member = await this.prisma.member.findUnique({
      where: { id },
      include: { plano: true, affiliate: true },
    });
    if (!member) {
      throw new NotFoundException('Sócio-torcedor não encontrado');
    }
    return member;
  }

  async update(id: number, dto: UpdateMemberDto) {
    await this.findOne(id);
    return this.prisma.member.update({
      where: { id },
      data: {
        nome: dto.nome,
        email: dto.email,
        telefone: dto.telefone,
        planoId: dto.planoId,
        affiliateId: dto.affiliateId,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.member.delete({
      where: { id },
    });
  }
}
