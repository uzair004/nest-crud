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
  ParseIntPipe,
  HttpException,
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

  @Get('/exception/simple')
  async exception(): Promise<HttpException> {
    throw new HttpException('This action is forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('/exception/custom-body')
  async exceptionCustomBody(): Promise<object> {
    try {
      throw new Error();
      return {};
    } catch (err: any) {
      throw new HttpException(
        {
          userFriendlyMsg: 'You are not allowed to perform this action',
          hintCode: 'VOILATION',
          message: 'Action Not Allowed!',
        },
        HttpStatus.FORBIDDEN,
        { cause: err },
      );
    }

  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const cat = this.catservice.findById(id);
    return { cat };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<object> {
    const cat: Cat = this.catservice.update(id, updateCatDto);
    return { cat };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const cat: Cat = this.catservice.remove(id);
    return { cat };
  }
}
