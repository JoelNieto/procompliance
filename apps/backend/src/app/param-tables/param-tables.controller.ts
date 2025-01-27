import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateParamTableDto } from './dto/create-param-table.dto';
import { UpdateParamTableDto } from './dto/update-param-table.dto';
import { ParamTablesService } from './param-tables.service';

@ApiTags('param-tables')
@Controller('param-tables')
export class ParamTablesController {
  constructor(private readonly paramTablesService: ParamTablesService) {}

  @Post()
  create(@Body() createParamTableDto: CreateParamTableDto) {
    return this.paramTablesService.create(createParamTableDto);
  }

  @Get()
  findAll() {
    return this.paramTablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paramTablesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParamTableDto: UpdateParamTableDto
  ) {
    return this.paramTablesService.update(id, updateParamTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paramTablesService.remove(id);
  }
}
