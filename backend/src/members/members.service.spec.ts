import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

describe('MembersService', () => {
  let service: MembersService;
  let prisma: {
    member: {
      create: jest.Mock;
      findMany: jest.Mock;
      count: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
    affiliate: {
      findUnique: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      member: {
        create: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      affiliate: {
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a member without affiliate', async () => {
    const dto: CreateMemberDto = {
      nome: 'Reinaldo',
      email: 'test@test.com',
      telefone: '123456',
      planoId: 1,
    };

    prisma.member.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(prisma.member.create).toHaveBeenCalledWith({
      data: { ...dto, affiliateId: undefined },
    });
  });

  it('should throw NotFoundException if affiliate does not exist', async () => {
    const dto: CreateMemberDto = {
      nome: 'Reinaldo',
      email: 'test@test.com',
      telefone: '123456',
      planoId: 1,
      affiliateId: 99,
    };

    prisma.affiliate.findUnique.mockResolvedValue(null);

    await expect(service.create(dto)).rejects.toThrow(NotFoundException);
  });

  it('should list members with pagination', async () => {
    prisma.member.findMany.mockResolvedValue([{ id: 1, nome: 'Reinaldo' }]);
    prisma.member.count.mockResolvedValue(1);

    const result = await service.findAll(1, 10);

    expect(result.total).toBe(1);
    expect(result.data).toHaveLength(1);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.totalPages).toBe(1);
  });

  it('should return a member by id', async () => {
    prisma.member.findUnique.mockResolvedValue({ id: 1, nome: 'Reinaldo' });

    const result = await service.findOne(1);

    expect(result).toEqual({ id: 1, nome: 'Reinaldo' });
    expect(prisma.member.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { plano: true, affiliate: true },
    });
  });

  it('should throw NotFoundException if member not found', async () => {
    prisma.member.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a member', async () => {
    const dto: UpdateMemberDto = { nome: 'Atualizado' };

    prisma.member.findUnique.mockResolvedValue({ id: 1, nome: 'Reinaldo' });
    prisma.member.update.mockResolvedValue({ id: 1, nome: 'Atualizado' });

    const result = await service.update(1, dto);

    expect(result).toEqual({ id: 1, nome: 'Atualizado' });
    expect(prisma.member.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        nome: dto.nome,
        email: dto.email,
        telefone: dto.telefone,
        planoId: dto.planoId,
        affiliateId: dto.affiliateId,
      },
    });
  });

  it('should delete a member', async () => {
    prisma.member.findUnique.mockResolvedValue({ id: 1, nome: 'Reinaldo' });
    prisma.member.delete.mockResolvedValue({ id: 1 });

    const result = await service.remove(1);

    expect(result).toEqual({ id: 1 });
    expect(prisma.member.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
