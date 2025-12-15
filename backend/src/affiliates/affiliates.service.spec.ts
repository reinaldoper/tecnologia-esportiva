import { Test, TestingModule } from '@nestjs/testing';
import { AffiliatesService } from './affiliates.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';

describe('AffiliatesService', () => {
  let service: AffiliatesService;
  let prisma: {
    affiliate: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      affiliate: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AffiliatesService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<AffiliatesService>(AffiliatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an affiliate', async () => {
    const dto: CreateAffiliateDto = {
      nome: 'Afiliado Teste',
      codigo: 'ABC123',
    };
    prisma.affiliate.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(prisma.affiliate.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it('should list all affiliates', async () => {
    prisma.affiliate.findMany.mockResolvedValue([
      { id: 1, nome: 'Afiliado Teste', membersIndicados: [] },
    ]);

    const result = await service.findAll();

    expect(result).toEqual([
      { id: 1, nome: 'Afiliado Teste', membersIndicados: [] },
    ]);
    expect(prisma.affiliate.findMany).toHaveBeenCalledWith({
      include: { membersIndicados: true },
    });
  });

  it('should return an affiliate by id', async () => {
    prisma.affiliate.findUnique.mockResolvedValue({
      id: 1,
      nome: 'Afiliado Teste',
      membersIndicados: [],
    });

    const result = await service.findOne(1);

    expect(result).toEqual({
      id: 1,
      nome: 'Afiliado Teste',
      membersIndicados: [],
    });
    expect(prisma.affiliate.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { membersIndicados: true },
    });
  });

  it('should throw NotFoundException if affiliate not found', async () => {
    prisma.affiliate.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update an affiliate', async () => {
    const dto: UpdateAffiliateDto = { nome: 'Atualizado', codigo: 'XYZ789' };

    prisma.affiliate.findUnique.mockResolvedValue({
      id: 1,
      nome: 'Afiliado Teste',
      membersIndicados: [],
    });
    prisma.affiliate.update.mockResolvedValue({ id: 1, ...dto });

    const result = await service.update(1, dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(prisma.affiliate.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: dto,
    });
  });

  it('should delete an affiliate', async () => {
    prisma.affiliate.findUnique.mockResolvedValue({
      id: 1,
      nome: 'Afiliado Teste',
      membersIndicados: [],
    });
    prisma.affiliate.delete.mockResolvedValue({ id: 1 });

    const result = await service.remove(1);

    expect(result).toEqual({ id: 1 });
    expect(prisma.affiliate.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should count members of an affiliate', async () => {
    prisma.affiliate.findUnique.mockResolvedValue({
      id: 1,
      nome: 'Afiliado Teste',
      membersIndicados: [{ id: 1 }, { id: 2 }],
    });

    const result = await service.countMembers(1);

    expect(result).toEqual({
      affiliateId: 1,
      nome: 'Afiliado Teste',
      totalIndicados: 2,
    });
  });

  it('should return ranking of affiliates', async () => {
    prisma.affiliate.findMany.mockResolvedValue([
      { id: 1, nome: 'A', codigo: 'A1', membersIndicados: [{}, {}] },
      { id: 2, nome: 'B', codigo: 'B1', membersIndicados: [{}] },
    ]);

    const result = await service.ranking();

    expect(result[0].totalIndicados).toBeGreaterThanOrEqual(
      result[1].totalIndicados,
    );
    expect(prisma.affiliate.findMany).toHaveBeenCalledWith({
      include: { membersIndicados: true },
    });
  });
});
