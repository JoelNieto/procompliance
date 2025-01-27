import { Test, TestingModule } from '@nestjs/testing';
import { ParamItemsController } from './param-items.controller';
import { ParamItemsService } from './param-items.service';

describe('ParamItemsController', () => {
  let controller: ParamItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParamItemsController],
      providers: [ParamItemsService],
    }).compile();

    controller = module.get<ParamItemsController>(ParamItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
