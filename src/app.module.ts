//  // src/app.module.ts
//  import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Session, SessionSchema } from './sessions/schemas/session.schema';
// import { Statement, StatementSchema } from './statements/schemas/statement.schema';
// import { Vote, VoteSchema } from './votes/schemas/vote.schema';

// import { User, UserSchema } from './users/schemas/users.schema';

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb://localhost:27017/unmask'),
//     MongooseModule.forFeature([
//       { name: User.name, schema: UserSchema },
//       { name: Session.name, schema: SessionSchema },
//       { name: Statement.name, schema: StatementSchema },
//       { name: Vote.name, schema: VoteSchema },
//     ]),
//   ],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { User, UserSchema } from './users/schemas/users.schema';
import { Session, SessionSchema } from './sessions/schemas/session.schema';
import { Statement, StatementSchema } from './statements/schemas/statement.schema';
import { Vote, VoteSchema } from './votes/schemas/vote.schema';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost:27017/unmask'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Session.name, schema: SessionSchema },
      { name: Statement.name, schema: StatementSchema },
      { name: Vote.name, schema: VoteSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
