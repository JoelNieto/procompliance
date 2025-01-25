import { Country, Participant } from '@procompliance/models';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity } from './country.entity';

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

  @ManyToOne(() => CountryEntity, { eager: true })
  @JoinColumn({ name: 'nationality_country_id', referencedColumnName: 'id' })
  nationality: Country;

  @ManyToOne(() => CountryEntity, { eager: true })
  @JoinColumn({ name: 'birth_country_id', referencedColumnName: 'id' })
  birth_country: Country;

  @ManyToOne(() => CountryEntity, { eager: true })
  @JoinColumn({ name: 'residence_country_id', referencedColumnName: 'id' })
  residence_country: Country;

  @Column({ type: 'date', nullable: true })
  birth_date?: Date;

  @Column({ type: 'text', default: 'active' })
  status: 'active' | 'inactive';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
