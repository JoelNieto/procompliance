import { signalStore } from '@ngrx/signals';
import { ParamTable } from '@procompliance/models';
import { withCustomEntity } from './entity.feature';
import { withLogger } from './logger.feature';

export const ParamTablesStore = signalStore(
  withLogger('PARAM_TABLES'),
  withCustomEntity<ParamTable>('param-tables')
);
