import { Test, TestingModule } from '@nestjs/testing';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { BadRequestException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

type MockedPlanService = {
  create: jest.Mock;
  findAll: jest.Mock;
  findOne: jest.Mock;
  update: jest.Mock;
  remove: jest.Mock;
};

describe('PlanController', () => {
  let controller: PlanController;
  let planService: MockedPlanService;

  const planServiceMock: MockedPlanService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanController],
      providers: [{ provide: PlanService, useValue: planServiceMock }],
    }).compile();

    controller = module.get<PlanController>(PlanController);
    planService = module.get(PlanService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a plan', async () => {
    const dto: CreatePlanDto = {
      nome: 'Plano Teste',
      precoMensal: 99,
      beneficios: 'Benefícios legais',
    };

    planService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(planService.create).toHaveBeenCalledWith(dto);
  });

  it('should list all plans with pagination', async () => {
    planService.findAll.mockResolvedValue({
      data: [
        {
          id: 1,
          nome: 'Plano Teste',
          precoMensal: 99,
          beneficios: 'Benefícios',
        },
      ],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    });

    const result = await controller.findAll(1, 10);

    expect(result.total).toBe(1);
    expect(planService.findAll).toHaveBeenCalledWith(1, 10);
  });

  it('should return a plan by id', async () => {
    planService.findOne.mockResolvedValue({ id: 1, nome: 'Plano Teste' });

    const result = await controller.findOne('1');

    expect(result).toEqual({ id: 1, nome: 'Plano Teste' });
    expect(planService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw BadRequestException for invalid id in findOne', async () => {
    await expect(controller.findOne('abc')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should update a plan', async () => {
    const dto: UpdatePlanDto = { nome: 'Plano Atualizado' };

    planService.update.mockResolvedValue({ id: 1, nome: 'Plano Atualizado' });

    const result = await controller.update('1', dto);

    expect(result).toEqual({ id: 1, nome: 'Plano Atualizado' });
    expect(planService.update).toHaveBeenCalledWith(1, dto);
  });

  it('should throw BadRequestException for invalid id in update', async () => {
    await expect(controller.update('abc', { nome: 'Teste' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should delete a plan', async () => {
    planService.remove.mockResolvedValue(undefined);

    const result = await controller.remove('1');

    expect(result).toBeUndefined();
    expect(planService.remove).toHaveBeenCalledWith(1);
  });

  it('should throw BadRequestException for invalid id in remove', async () => {
    await expect(controller.remove('abc')).rejects.toThrow(BadRequestException);
  });
});
