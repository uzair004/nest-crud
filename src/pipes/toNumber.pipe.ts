/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ToNumberPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    if (!isNaN(value)) return Number(value);
    else
      throw new BadRequestException(
        {
          userFriendlyMsg: 'Incorrect id provided',
          hintCode: 'VOILATION',
          message: 'id must be of type number',
        },
        {
          cause: 'Bad Argument',
          description: 'The id param is supposed to be of type number only',
        },
      );
  }
}
