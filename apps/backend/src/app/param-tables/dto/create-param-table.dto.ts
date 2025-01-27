import { ApiProperty } from '@nestjs/swagger';
import { EntityDto, ParamTable } from '@procompliance/models';
import { IsString } from 'class-validator';

export class CreateParamTableDto implements EntityDto<ParamTable> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;
}
