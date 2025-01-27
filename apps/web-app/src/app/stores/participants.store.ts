import { signalStore } from '@ngrx/signals';
import { Participant } from '@procompliance/models';
import { withCustomEntity } from './entity.feature';
import { withLogger } from './logger.feature';

export const ParticipantsStore = signalStore(
  withLogger('PARTICIPANTS'),
  withCustomEntity<Participant>('participants')
);
