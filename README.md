
## Description

[Nest] A game backend software for unmask.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```


## Stay in touch

- Author - Asabuodu Innocent



lized +6ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [InstanceLoader] ConfigModule dependencies initialized +8ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [InstanceLoader] MongooseCoreModule dependencies initialized +150ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [InstanceLoader] MongooseModule dependencies initialized +2ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [InstanceLoader] MongooseModule dependencies initialized +1ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [InstanceLoader] MongooseModule dependencies initialized +0ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [InstanceLoader] MongooseModule dependencies initialized +1ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [InstanceLoader] SessionsModule dependencies initialized +0ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [InstanceLoader] UsersModule dependencies initialized +1ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [InstanceLoader] StatementsModule dependencies initialized +0ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [InstanceLoader] VotesModule dependencies initialized +0ms
🌐 CORS enabled for all origins
🔧 Global prefix set to /api


## Routes

[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RoutesResolver] AppController {/api}: +10ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RouterExplorer] Mapped {/api, GET} route +15ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RoutesResolver] SessionsController {/api/sessions}: +9ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RouterExplorer] Mapped {/api/sessions, POST} route +2ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RouterExplorer] Mapped {/api/sessions/join, POST} route +1ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RouterExplorer] Mapped {/api/sessions/:code, GET} route +2ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RouterExplorer] Mapped {/api/sessions/:code/end, POST} route +1ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RoutesResolver] UsersController {/api/users}: +0ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RouterExplorer] Mapped {/api/users/register, POST} route +2ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RoutesResolver] StatementsController {/api/statements}: +0ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RouterExplorer] Mapped {/api/statements, POST} route +1ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RouterExplorer] Mapped {/api/statements/:ownerId, GET} route +1ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RoutesResolver] VotesController {/api/votes}: +0ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RouterExplorer] Mapped {/api/votes, POST} route +1ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [RouterExplorer] Mapped {/api/votes/:statementId, GET} route +3ms
[Nest] 8048  - 02/10/2025, 11:58:34     LOG [NestApplication] Nest application successfully started +5ms