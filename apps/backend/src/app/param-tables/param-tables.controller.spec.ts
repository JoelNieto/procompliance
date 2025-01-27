import { Test, TestingModule } from '@nestjs/testing';
import { ParamTablesController } from './param-tables.controller';
import { ParamTablesService } from './param-tables.service';

describe('ParamTablesController', () => {
  let controller: ParamTablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParamTablesController],
      providers: [ParamTablesService],
    }).compile();

    controller = module.get<ParamTablesController>(ParamTablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
