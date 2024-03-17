import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';
import { CreateCatDto } from './cats-dto';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto) {
    const id: number = Math.random() * 1000;
    this.cats.push({ id, ...cat });
  }

  findAll() {
    return this.cats;
  }

  findById(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }
}
