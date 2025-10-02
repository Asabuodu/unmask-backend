// import { Module } from '@nestjs/common';
// import { GamesGateway } from './games.gateway';

// @Module({
//   providers: [GamesGateway],
// })
// export class GamesModule {}

import { Module } from '@nestjs/common';
import { GamesGateway } from './games.gateway';
import { GamesService } from './games.service';
import { VotesModule } from '../votes/votes.module';
import { StatementsModule } from '../statements/statements.module';
import { UsersModule } from '../users/users.module';
import { SessionsModule } from '../sessions/sessions.module';
//import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [VotesModule, StatementsModule, UsersModule, SessionsModule],
  providers: [GamesGateway, GamesService],
  exports: [GamesService],
})
export class GamesModule {}