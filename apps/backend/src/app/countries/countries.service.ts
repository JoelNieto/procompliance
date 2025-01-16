import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from '../entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly repo: Repository<CountryEntity>
  ) {}
  create(createCountryDto: CreateCountryDto) {
    return this.repo.save(createCountryDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneByOrFail({ id });
  }

  async update({
    id,
    updateCountryDto,
  }: {
    id: string;
    updateCountryDto: UpdateCountryDto;
  }) {
    let country = await this.repo.findOneByOrFail({ id });
    country = { ...country, ...updateCountryDto, id };
    return this.repo.save(country);
  }

  remove(id: string) {
    return this.repo.delete({ id });
  }
}
