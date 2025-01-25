import { ApiProperty } from '@nestjs/swagger';
import { Country, EntityDto } from '@procompliance/models';

export class CreateCountryDto implements EntityDto<Country> {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  iso2: string;

  @ApiProperty({ required: true })
  iso3: string;

  @ApiProperty({ required: false })
  local_name: string;
}
