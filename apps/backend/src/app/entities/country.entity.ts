import { Country } from '@procompliance/models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'countries' })
export class CountryEntity implements Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  iso2: string;

  @Column({ type: 'text' })
  iso3: string;

  @Column({ type: 'text', nullable: true })
  local_name?: string;
}
