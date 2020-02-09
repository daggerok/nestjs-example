# nestjs-example
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
  wtf(): string {
    return 'O.o';
  }
}
```

_controller_

```typescript
import { Controller, Post } from '@nestjs/common';
import { MaksimkoService } from './maksimko.service';

@Controller('maksimko')
export class MaksimkoController {

  constructor(private maksimkoService: MaksimkoService) {}

  @Post('/wtf') // -> POST /maksimko/wtf
  wtf(): string {
    return this.maksimkoService.wtf();
  }
}
```

### testing

```bash
http post :3000/maksimko/wtf
```

output:

```http
HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 3
Content-Type: text/html; charset=utf-8
Date: Sun, 09 Feb 2020 13:49:26 GMT
ETag: W/"3-8NDaRTE2bjPAxaWSq3pLw2F5gjg"
X-Powered-By: Express

O.o
```

<!--

## default README.md

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

-->

## License

Nest is [MIT licensed](LICENSE).

## resoiurces

* [Official documentation](https://docs.nestjs.com/)
* [project GitHub repo: nestjs/nest](https://github.com/nestjs/nest)
