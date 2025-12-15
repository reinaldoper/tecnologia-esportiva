import { Test, TestingModule } from '@nestjs/testing';
import { PlanService } from './plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

describe('PlanService', () => {
  let service: PlanService;
  let prisma: {
    plan: {
      create: jest.Mock;
      findMany: jest.Mock;
      count: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      plan: {
        create: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<PlanService>(PlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a plan', async () => {
    const dto: CreatePlanDto = {
      nome: 'Plano Teste',
      precoMensal: 99,
      beneficios: 'Benefícios legais',
    };

    prisma.plan.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(prisma.plan.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it('should list all plans with pagination', async () => {
    prisma.plan.findMany.mockResolvedValue([{ id: 1, nome: 'Plano Teste' }]);
    prisma.plan.count.mockResolvedValue(1);

    const result = await service.findAll(1, 10);

    expect(result.total).toBe(1);
    expect(result.data).toHaveLength(1);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.totalPages).toBe(1);
  });

  it('should return a plan by id', async () => {
    prisma.plan.findUnique.mockResolvedValue({ id: 1, nome: 'Plano Teste' });

    const result = await service.findOne(1);

    expect(result).toEqual({ id: 1, nome: 'Plano Teste' });
    expect(prisma.plan.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { members: true },
    });
  });

  it('should throw NotFoundException if plan not found', async () => {
    prisma.plan.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a plan', async () => {
    const dto: UpdatePlanDto = { nome: 'Plano Atualizado' };

    prisma.plan.findUnique.mockResolvedValue({ id: 1, nome: 'Plano Teste' });
    prisma.plan.update.mockResolvedValue({ id: 1, nome: 'Plano Atualizado' });

    const result = await service.update(1, dto);

    expect(result).toEqual({ id: 1, nome: 'Plano Atualizado' });
    expect(prisma.plan.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        nome: dto.nome,
        precoMensal: dto.precoMensal,
        beneficios: dto.beneficios,
      },
    });
  });

  it('should delete a plan', async () => {
    prisma.plan.findUnique.mockResolvedValue({ id: 1, nome: 'Plano Teste' });
    prisma.plan.delete.mockResolvedValue({ id: 1 });

    const result = await service.remove(1);

    expect(result).toEqual({ id: 1 });
    expect(prisma.plan.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
