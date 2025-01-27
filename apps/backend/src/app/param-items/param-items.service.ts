import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParamItemDto } from './dto/create-param-item.dto';
import { UpdateParamItemDto } from './dto/update-param-item.dto';
import { ParamItemEntity } from './entities/param-item.entity';

@Injectable()
export class ParamItemsService {
  constructor(
    @InjectRepository(ParamItemEntity) private repo: Repository<ParamItemEntity>
  ) {}

  create(createParamItemDto: CreateParamItemDto) {
    return this.repo.save(createParamItemDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneByOrFail({ id });
  }

  async update(id: string, updateParamItemDto: UpdateParamItemDto) {
    let paramItem = await this.repo.findOneByOrFail({ id });
    paramItem = { ...paramItem, ...updateParamItemDto, id };
    return this.repo.save(paramItem);
  }

  remove(id: string) {
    return this.repo.delete({ id });
  }
}
