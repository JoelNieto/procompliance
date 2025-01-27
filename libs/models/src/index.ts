export * from './lib/countries';
export * from './lib/param-tables';
export * from './lib/participants';

export type EntityType<T> = Omit<T, 'created_at' | 'updated_at'>;
export type EntityDto<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
