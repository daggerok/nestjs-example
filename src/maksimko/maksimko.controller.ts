import { Controller, Post } from '@nestjs/common';
import { MaksimkoService } from './maksimko.service';

@Controller('maksimko')
export class MaksimkoController {

  constructor(private maksimkoService: MaksimkoService) {}

  @Post('/wtf')
  wtf(): string {
    return this.maksimkoService.wtf();
  }
}
