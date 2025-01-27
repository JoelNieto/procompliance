import { PartialType } from '@nestjs/swagger';
import { CreateParamItemDto } from './create-param-item.dto';

export class UpdateParamItemDto extends PartialType(CreateParamItemDto) {}
