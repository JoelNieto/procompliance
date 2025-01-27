import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParamTableDto } from './dto/create-param-table.dto';
import { UpdateParamTableDto } from './dto/update-param-table.dto';
import { ParamTableEntity } from './entities/param-table.entity';

@Injectable()
export class ParamTablesService {
  constructor(
    @InjectRepository(ParamTableEntity)
    private readonly repo: Repository<ParamTableEntity>
  ) {}

  create(createParamTableDto: CreateParamTableDto) {
    return this.repo.save(createParamTableDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneByOrFail({ id });
  }

  async update(id: string, updateParamTableDto: UpdateParamTableDto) {
    let paramTable = await this.repo.findOneByOrFail({ id });
    paramTable = { ...paramTable, ...updateParamTableDto, id };
    return this.repo.save(paramTable);
  }

  remove(id: string) {
    return this.repo.delete({ id });
  }
}
