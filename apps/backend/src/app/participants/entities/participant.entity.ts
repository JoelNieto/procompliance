import { Participant } from '@procompliance/models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'participants' })
export class ParticipantEntity implements Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, default: '' })
  first_name: string;

  @Column({ type: 'text', nullable: false, default: '' })
  last_name: string;

  @Column({ type: 'text', nullable: false, default: '' })
  document_id: string;

  @Column({ type: 'text', nullable: false, default: '' })
  email: string;

  @Column({ type: 'text', default: 'other' })
  gender: 'male' | 'female' | 'other';

  @Column({ type: 'text', default: '' })
  phone?: string;

  @Column({ type: 'text', default: '' })
  city: string;

  @Column({ type: 'text', default: '' })
  address: string;

  @Column({ type: 'text', default: '' })
  nationality: string;

  @Column({ type: 'text', default: '' })
  birth_country: string;

  @Column({ type: 'text', default: '' })
  residence_country: string;

  @Column({ type: 'date', nullable: true })
  birth_date?: Date;

  @Column({ type: 'text', default: 'active' })
  status: 'active' | 'inactive';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
