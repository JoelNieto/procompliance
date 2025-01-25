import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantEntity } from '../entities/participant.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly repo: Repository<ParticipantEntity>
  ) {}

  create(createParticipantDto: CreateParticipantDto) {
    return this.repo.save(createParticipantDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneByOrFail({ id });
  }

  async update({
    id,
    updateParticipantDto,
  }: {
    id: string;
    updateParticipantDto: UpdateParticipantDto;
  }) {
    let participant = await this.repo.findOneByOrFail({ id });
    participant = { ...participant, ...updateParticipantDto, id };
    return this.repo.save(participant);
  }

  remove(id: string) {
    return this.repo.delete({ id });
  }
}
