import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { BadRequestException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

type MockedMembersService = {
  create: jest.Mock;
  findAll: jest.Mock;
  findOne: jest.Mock;
  update: jest.Mock;
  remove: jest.Mock;
};

describe('MembersController', () => {
  let controller: MembersController;
  let membersService: MockedMembersService;

  const membersServiceMock: MockedMembersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [{ provide: MembersService, useValue: membersServiceMock }],
    }).compile();

    controller = module.get<MembersController>(MembersController);
    membersService = module.get(MembersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a member', async () => {
    const dto: CreateMemberDto = {
      nome: 'Reinaldo',
      email: 'test@test.com',
      planoId: 1,
      telefone: '123456789',
    };

    membersService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(membersService.create).toHaveBeenCalledWith(dto);
  });

  it('should list members with pagination', async () => {
    membersService.findAll.mockResolvedValue({
      data: [{ id: 1, nome: 'Reinaldo' }],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    });

    const result = await controller.findAll(1, 10);

    expect(result.total).toBe(1);
    expect(membersService.findAll).toHaveBeenCalledWith(1, 10);
  });

  it('should return a member by id', async () => {
    membersService.findOne.mockResolvedValue({ id: 1, nome: 'Reinaldo' });

    const result = await controller.findOne('1');

    expect(result).toEqual({ id: 1, nome: 'Reinaldo' });
    expect(membersService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw BadRequestException for invalid id in findOne', async () => {
    await expect(controller.findOne('abc')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should update a member', async () => {
    const dto: UpdateMemberDto = { nome: 'Atualizado' };

    membersService.update.mockResolvedValue({ id: 1, nome: 'Atualizado' });

    const result = await controller.update('1', dto);

    expect(result).toEqual({ id: 1, nome: 'Atualizado' });
    expect(membersService.update).toHaveBeenCalledWith(1, dto);
  });

  it('should throw BadRequestException for invalid id in update', async () => {
    await expect(controller.update('abc', { nome: 'Teste' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should delete a member', async () => {
    membersService.remove.mockResolvedValue(undefined);

    const result = await controller.remove('1');

    expect(result).toBeUndefined();
    expect(membersService.remove).toHaveBeenCalledWith(1);
  });

  it('should throw BadRequestException for invalid id in remove', async () => {
    await expect(controller.remove('abc')).rejects.toThrow(BadRequestException);
  });
});
