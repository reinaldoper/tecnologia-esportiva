import { Test, TestingModule } from '@nestjs/testing';
import { AffiliatesController } from './affiliates.controller';
import { AffiliatesService } from './affiliates.service';
import { BadRequestException } from '@nestjs/common';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';

type MockedAffiliatesService = {
  create: jest.Mock;
  findAll: jest.Mock;
  findOne: jest.Mock;
  update: jest.Mock;
  remove: jest.Mock;
  countMembers: jest.Mock;
  ranking: jest.Mock;
};

describe('AffiliatesController', () => {
  let controller: AffiliatesController;
  let affiliatesService: MockedAffiliatesService;

  const affiliatesServiceMock: MockedAffiliatesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    countMembers: jest.fn(),
    ranking: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AffiliatesController],
      providers: [
        { provide: AffiliatesService, useValue: affiliatesServiceMock },
      ],
    }).compile();

    controller = module.get<AffiliatesController>(AffiliatesController);
    affiliatesService = module.get(AffiliatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an affiliate', async () => {
    const dto: CreateAffiliateDto = {
      nome: 'Afiliado Teste',
      codigo: 'ABC123',
    };
    affiliatesService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(affiliatesService.create).toHaveBeenCalledWith(dto);
  });

  it('should list all affiliates', async () => {
    affiliatesService.findAll.mockResolvedValue([
      { id: 1, nome: 'Afiliado Teste' },
    ]);

    const result = await controller.findAll();

    expect(result).toEqual([{ id: 1, nome: 'Afiliado Teste' }]);
    expect(affiliatesService.findAll).toHaveBeenCalled();
  });

  it('should return an affiliate by id', async () => {
    affiliatesService.findOne.mockResolvedValue({
      id: 1,
      nome: 'Afiliado Teste',
    });

    const result = await controller.findOne('1');

    expect(result).toEqual({ id: 1, nome: 'Afiliado Teste' });
    expect(affiliatesService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw BadRequestException for invalid id in findOne', async () => {
    await expect(controller.findOne('abc')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should update an affiliate', async () => {
    const dto: UpdateAffiliateDto = { nome: 'Atualizado' };
    affiliatesService.update.mockResolvedValue({ id: 1, nome: 'Atualizado' });

    const result = await controller.update('1', dto);

    expect(result).toEqual({ id: 1, nome: 'Atualizado' });
    expect(affiliatesService.update).toHaveBeenCalledWith(1, dto);
  });

  it('should throw BadRequestException for invalid id in update', async () => {
    await expect(controller.update('abc', { nome: 'Teste' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should delete an affiliate', async () => {
    affiliatesService.remove.mockResolvedValue(undefined);

    const result = await controller.remove('1');

    expect(result).toBeUndefined();
    expect(affiliatesService.remove).toHaveBeenCalledWith(1);
  });

  it('should throw BadRequestException for invalid id in remove', async () => {
    await expect(controller.remove('abc')).rejects.toThrow(BadRequestException);
  });

  it('should count members of an affiliate', async () => {
    affiliatesService.countMembers.mockResolvedValue(5);

    const result = await controller.countMembers('1');

    expect(result).toBe(5);
    expect(affiliatesService.countMembers).toHaveBeenCalledWith(1);
  });

  it('should throw BadRequestException for invalid id in countMembers', async () => {
    await expect(controller.countMembers('abc')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return ranking of affiliates', async () => {
    affiliatesService.ranking.mockResolvedValue([
      { id: 1, nome: 'Afiliado Teste', totalMembers: 5 },
    ]);

    const result = await controller.ranking();

    expect(result).toEqual([
      { id: 1, nome: 'Afiliado Teste', totalMembers: 5 },
    ]);
    expect(affiliatesService.ranking).toHaveBeenCalled();
  });
});
