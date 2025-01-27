import { PartialType } from '@nestjs/swagger';
import { CreateParamTableDto } from './create-param-table.dto';

export class UpdateParamTableDto extends PartialType(CreateParamTableDto) {}
