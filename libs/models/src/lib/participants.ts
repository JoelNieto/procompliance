export type Participant = {
  id: string;
  first_name: string;
  last_name: string;
  document_id: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  phone?: string;
  city: string;
  address: string;
  nationality?: string;
  birth_country?: string;
  residence_country?: string;
  birth_date?: Date;
  status: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
};
