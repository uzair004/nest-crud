import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatService } from './cats/cats.service';
import { logger } from './logger/logger.middleware';
import * as cors from 'cors';
import helmet from 'helmet';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService, CatService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), helmet(), logger)
      .exclude({ path: '/cats', method: RequestMethod.GET })
      .forRoutes(CatsController);
  }
}
