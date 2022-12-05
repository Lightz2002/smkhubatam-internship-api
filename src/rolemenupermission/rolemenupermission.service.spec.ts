import { Test, TestingModule } from '@nestjs/testing';
import { RolemenupermissionService } from './rolemenupermission.service';

describe('RolemenupermissionService', () => {
  let service: RolemenupermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolemenupermissionService],
    }).compile();

    service = module.get<RolemenupermissionService>(RolemenupermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
