import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaksimkoModule } from './maksimko/maksimko.module';

@Module({
  imports: [MaksimkoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
