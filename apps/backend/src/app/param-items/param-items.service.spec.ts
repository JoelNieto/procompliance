import { Test, TestingModule } from '@nestjs/testing';
import { ParamItemsService } from './param-items.service';

describe('ParamItemsService', () => {
  let service: ParamItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParamItemsService],
    }).compile();

    service = module.get<ParamItemsService>(ParamItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
