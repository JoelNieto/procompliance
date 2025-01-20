export * from './lib/countries';

export type EntityType<T> = Omit<T, 'created_at' | 'updated_at'>;
export type EntityDto<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
