import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class logger implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('example logger...');
    next();
  }
}
