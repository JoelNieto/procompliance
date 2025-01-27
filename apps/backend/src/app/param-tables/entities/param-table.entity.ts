import { ParamTable } from '@procompliance/models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'param_tables' })
export class ParamTableEntity implements ParamTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, default: '' })
  name: string;

  @Column({ type: 'text', nullable: false, default: '', unique: true })
  code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
