import { ApiProperty } from '@nestjs/swagger';
import { Country, EntityDto, Participant } from '@procompliance/models';

import {
  IsDate,
  IsEmail,
  IsObject,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
export class CreateParticipantDto implements EntityDto<Participant> {
  @ApiProperty({ required: true })
  @IsString()
  first_name: string;

  @ApiProperty({ required: true })
  @IsString()
  last_name: string;

  @ApiProperty({ required: true })
  @IsString()
  document_id: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, enum: ['male', 'female', 'other'] })
  gender: 'male' | 'female' | 'other';

  @ApiProperty({ required: true })
  @IsPhoneNumber()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false, example: 'City' })
  @IsString()
  city: string;

  @ApiProperty({ required: false, example: 'Address' })
  @IsString()
  address: string;

  @ApiProperty({ required: true })
  @IsObject()
  nationality: Country;

  @ApiProperty({ required: true })
  @IsObject()
  birth_country: Country;

  @ApiProperty({ required: true })
  @IsObject()
  residence_country: Country;

  @ApiProperty({ required: false })
  @IsDate()
  birth_date?: Date;

  @ApiProperty({ required: true, enum: ['active', 'inactive'] })
  @IsString()
  status: 'active' | 'inactive';
}
