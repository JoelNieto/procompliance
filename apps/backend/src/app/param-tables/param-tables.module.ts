import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParamTableEntity } from './entities/param-table.entity';
import { ParamTablesController } from './param-tables.controller';
import { ParamTablesService } from './param-tables.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParamTableEntity])],
  controllers: [ParamTablesController],
  providers: [ParamTablesService],
})
export class ParamTablesModule {}
