
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';

// import { User, UserSchema } from './users/schemas/users.schema';
// import { Session, SessionSchema } from './sessions/schemas/session.schema';
// import { Statement, StatementSchema } from './statements/schemas/statement.schema';
// import { Vote, VoteSchema } from './votes/schemas/vote.schema';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost:27017/unmask'),
//     MongooseModule.forFeature([
//       { name: User.name, schema: UserSchema },
//       { name: Session.name, schema: SessionSchema },
//       { name: Statement.name, schema: StatementSchema },
//       { name: Vote.name, schema: VoteSchema },
//     ]),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}




// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// // Import your feature modules
// import { SessionsModule } from './sessions/sessions.module';
// import { UsersModule } from './users/users.module';
// import { StatementsModule } from './statements/statements.module';
// import { VotesModule } from './votes/votes.module';
// //import { VotesService } from './votes/votes.service';
// // import {AuthController} from './auth/auth.controller';
// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost:27017/unmask'),
    
//     // Add your feature modules here (not just Mongoose schemas)
//    // AuthController,
//     //AppService,
//     SessionsModule,
//     UsersModule, 
//     StatementsModule,
//     VotesModule,
//     //VotesService,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import your feature MODULES only (not services/controllers)
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
import { StatementsModule } from './statements/statements.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost:27017/unmask'),
    
    // Only MODULES should be in imports array
    SessionsModule,
    UsersModule, 
    StatementsModule,
    VotesModule,
    // REMOVED: VotesService, AppService, AuthController
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}