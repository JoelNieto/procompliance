import { signalStore } from '@ngrx/signals';
import { Country } from '@procompliance/models';
import { withCustomEntity } from './entity.feature';
import { withLogger } from './logger.feature';

export const CountriesStore = signalStore(
  withLogger('COUNTRIES'),
  withCustomEntity<Country>('countries')
);
