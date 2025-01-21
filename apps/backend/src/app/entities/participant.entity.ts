import { Country, Participant } from '@procompliance/models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'participants' })
export class ParticipantEntity implements Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  first_name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ type: 'text' })
  document_id: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  gender: 'male' | 'female' | 'other';

  @Column({ type: 'text' })
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
}
