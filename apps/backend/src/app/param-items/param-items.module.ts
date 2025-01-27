import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParamItemEntity } from './entities/param-item.entity';
import { ParamItemsController } from './param-items.controller';
import { ParamItemsService } from './param-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParamItemEntity])],
  controllers: [ParamItemsController],
  providers: [ParamItemsService],
})
export class ParamItemsModule {}
