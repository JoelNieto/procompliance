import { Test, TestingModule } from '@nestjs/testing';
import { ParamTablesService } from './param-tables.service';

describe('ParamTablesService', () => {
  let service: ParamTablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParamTablesService],
    }).compile();

    service = module.get<ParamTablesService>(ParamTablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
