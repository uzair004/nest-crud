import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';
import { CreateCatDto, UpdateCatDto } from './cats-dto';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto) {
    const id: number = +(Math.random() * (10000 - 900) + 900).toFixed();
    this.cats.push({ id, ...cat });
  }

  findAll() {
    return this.cats;
  }

  findById(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }

  update(id: number, newCat: UpdateCatDto): Cat {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      throw new Error('Cat not found');
    }

    const updatedCat = { ...this.cats[catIndex], ...newCat };
    this.cats[catIndex] = updatedCat;
    return updatedCat;
  }

  remove(id: number): Cat {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      throw new Error('Cat not found');
    }
    // Removing the cat from the array
    const removedCat = this.cats.splice(catIndex, 1)[0];
    return removedCat;
  }
}
