// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { SessionsModule } from './sessions/sessions.module';
// import { GamesModule } from './games/games.module';
// import { StatementsModule } from './statements/statements.module';
// import { VotesModule } from './votes/votes.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     MongooseModule.forRoot(
//       process.env.MONGO_URI || 'mongodb://localhost/unmask'
//     ),
//     UsersModule,
//     AuthModule,
//     SessionsModule,
//     GamesModule,
//     StatementsModule,
//     VotesModule,
//   ],
// })
// export class AppModule {}

import { User, UserSchema } from './users/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/unmask'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Session.name, schema: SessionSchema },
      { name: Statement.name, schema: StatementSchema },
      { name: Vote.name, schema: VoteSchema },
    ]),
  ],
})
export class AppModule {}
