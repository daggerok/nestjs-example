import { Module } from '@nestjs/common';
import { MaksimkoController } from './maksimko.controller';
import { MaksimkoService } from './maksimko.service';

@Module({
  controllers: [MaksimkoController],
  providers: [MaksimkoService]
})
export class MaksimkoModule {}
