import { ApiProperty } from '@nestjs/swagger';
import { EntityDto, ParamItem } from '@procompliance/models';
import { IsNumber, IsString } from 'class-validator';

export class CreateParamItemDto implements EntityDto<ParamItem> {
  @ApiProperty()
  @IsString()
  param_table_id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  value: number;
}
