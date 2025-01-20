import { Country } from './countries';

export type Participant = {
  id: string;
  first_name: string;
  last_name: string;
  document_id: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  country: string;
  city: string;
  address: string;
  nationality: Country;
  birth_country: Country;
  residence_country: Country;
  birth_date?: Date;
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
};
