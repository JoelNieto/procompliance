import { ParamItem } from '@procompliance/models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'param_items' })
export class ParamItemEntity implements ParamItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  param_table_id: string;

  @Column({ type: 'text', nullable: false, default: '' })
  name: string;

  @Column({ type: 'float', nullable: false, default: 0 })
  value: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
