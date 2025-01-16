import { signalStore } from '@ngrx/signals';
import { withCountriesStore } from './countries.store';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withCountriesStore()
);
