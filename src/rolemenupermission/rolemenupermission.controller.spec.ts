import { Test, TestingModule } from '@nestjs/testing';
import { RolemenupermissionController } from './rolemenupermission.controller';

describe('RolemenupermissionController', () => {
  let controller: RolemenupermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolemenupermissionController],
    }).compile();

    controller = module.get<RolemenupermissionController>(RolemenupermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
