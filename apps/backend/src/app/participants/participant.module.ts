import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantEntity } from './entities/participant.entity';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantEntity])],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}
