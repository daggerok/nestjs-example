import { Controller, Param, Post } from '@nestjs/common';
import { MaksimkoService } from './maksimko.service';

@Controller('maksimko')
export class MaksimkoController {

  constructor(private maksimkoService: MaksimkoService) {}

  @Post('/wtf/:what')
  async wtf(@Param('what') what: string): Promise<string> {
    return this.maksimkoService.wtf(what);
  }
}
