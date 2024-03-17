import {
  Controller,
  Get,
  Param,
  Query,
  Ip,
  Res,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { CreateCatDto, UpdateCatDto } from './cats-dto';

import { CatService } from './cats.service';
import { Cat } from './cats.interface';

@Controller('cats')
export class CatsController {
  constructor(private catservice: CatService) {}

  @Get()
  async findAll(
    @Query() query: object,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<object> {
    console.log({ query });
    console.log({ ip });
    res.status(HttpStatus.OK);
    const cats: Cat[] = this.catservice.findAll();
    return { cats };
  }

  @Post()
  async create(@Body() catData: CreateCatDto): Promise<object> {
    this.catservice.create(catData);
    return {};
  }

  @Get('id')
  async findOne(@Param('id') id: number): Promise<object> {
    console.log({ id });
    const cat = this.catservice.findById(id);
    return { cat };
  }

  @Put('id')
  async update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<object> {
    console.log({ id, updateCatDto });
    return {};
  }

  @Delete('id')
  async remove(@Param('id') id: string): Promise<object> {
    console.log({ id });
    return {};
  }
}
