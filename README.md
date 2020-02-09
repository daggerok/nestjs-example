# nestjs-example [![CI](https://github.com/daggerok/nestjs-example/workflows/CI/badge.svg)](https://github.com/daggerok/nestjs-example/actions)
Finally JavaScript has something useful for backend development...

let's quickly guide its basics....

## create default boilerplate

```bash
npx @nestjs/cli new nestjs-example
cd nestjs-example
npm start
```

## structure

### starting point

_src/main.ts_

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### nest app module

_src/app.module.ts_

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### controller

_src/app.controller.ts_

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // http://127.0.0.1:3000/**
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // -> GET /
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### service

this service will be injected in controller via constructor (see above)

_src/app.service.ts_

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

## testing

as we can see, how we have only one endpoint: `GET /` which should hello:

```bash
http :3000
```

response

```http request
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 12
Content-Type: text/html; charset=utf-8
Date: Sun, 09 Feb 2020 13:13:44 GMT
ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
X-Powered-By: Express

Hello World!
```

## implement a feature

if you familiar with ng cli (@angular/cli from Angular framework) it would be very similar!

### new module

let's implement Maksimko's module:

```bash
npx @nestjs/cli generate module maksimko
#CREATE /src/maksimko/maksimko.module.ts (85 bytes)
#UPDATE /src/app.module.ts (324 bytes)
```

verify main module has been updated:

_src/app.module.ts_

```typescript
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
```

as you can see, now imports array is not empty and contains created `MaksimkoModule`:

_src/maksimko/maksimko.module.ts_

```typescript
import { Module } from '@nestjs/common';

@Module({})
export class MaksimkoModule {}
```

### new controller

similarly, let's generate new controller

```bash
npx @nestjs/cli generate controller maksimko
#CREATE /src/maksimko/maksimko.controller.spec.ts (507 bytes)
#CREATE /src/maksimko/maksimko.controller.ts (105 bytes)
#UPDATE /src/maksimko/maksimko.module.ts (182 bytes)
```

now maksimko module should be updated:

_src/maksimko/maksimko.module.ts_

```typescript
import { Module } from '@nestjs/common';
import { MaksimkoController } from './maksimko.controller';

@Module({
  controllers: [MaksimkoController]
})
export class MaksimkoModule {}
```

and new controller created:

_src/maksimko/maksimko.controller.ts_

```typescript
import { Controller } from '@nestjs/common';

@Controller('maksimko') // http://127.0.0.21:3000/maksimko/**
export class MaksimkoController {}
```

### new service

finally let's similarly create new service:

```bash
npx @nestjs/cli generate service maksimko
#CREATE /src/maksimko/maksimko.service.spec.ts (474 bytes)
#CREATE /src/maksimko/maksimko.service.ts (92 bytes)
#UPDATE /src/maksimko/maksimko.module.ts (268 bytes)
```

_src/maksimko/maksimko.module.ts_

```typescript
import { Module } from '@nestjs/common';
import { MaksimkoController } from './maksimko.controller';
import { MaksimkoService } from './maksimko.service';

@Module({
  controllers: [MaksimkoController],
  providers: [MaksimkoService]
})
export class MaksimkoModule {}
```

_src/maksimko/maksimko.service.ts_

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class MaksimkoService {}
```

### implementation

_service_

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class MaksimkoService {
  wtf(what: string): string {
    return `O.o ${what}?`;
  }
}
```

_controller_

```typescript
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
```

### testing

```bash
http post :3000/maksimko/wtf/ololo
```

output:

```http
HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 10
Content-Type: text/html; charset=utf-8
Date: Sun, 09 Feb 2020 15:22:17 GMT
ETag: W/"a-PbhLKehORdMno9Pz2s34zAbmS0I"
X-Powered-By: Express

O.o ololo?
```

## License

Nest is [MIT licensed](LICENSE).

## resoiurces

* [Official documentation](https://docs.nestjs.com/)
* [project GitHub repo: nestjs/nest](https://github.com/nestjs/nest)
* [YouTube: NestJS For Absolute Beginners](youtube.com/watch?v=4RkMAt8-u8g)
