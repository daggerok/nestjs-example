import { Injectable } from '@nestjs/common';

@Injectable()
export class MaksimkoService {
  wtf(what: string): string {
    return `O.o ${what}?`;
  }
}
