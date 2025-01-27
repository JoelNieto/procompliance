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
import { CreateParamItemDto } from './dto/create-param-item.dto';
import { UpdateParamItemDto } from './dto/update-param-item.dto';
import { ParamItemsService } from './param-items.service';

@ApiTags('Param items')
@Controller('param-items')
export class ParamItemsController {
  constructor(private readonly paramItemsService: ParamItemsService) {}

  @Post()
  create(@Body() createParamItemDto: CreateParamItemDto) {
    return this.paramItemsService.create(createParamItemDto);
  }

  @Get()
  findAll() {
    return this.paramItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paramItemsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParamItemDto: UpdateParamItemDto
  ) {
    return this.paramItemsService.update(id, updateParamItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paramItemsService.remove(id);
  }
}
