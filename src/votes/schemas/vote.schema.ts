// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';
// import { User } from '../../users/schemas/user.schema';
// import { Statement } from '../../statements/schemas/statement.schema';

// @Schema({ timestamps: true })
// export class Vote extends Document {
//   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
//   voter: User;

//   @Prop({ type: Types.ObjectId, ref: 'Statement', required: true })
//   statement: Statement;

//   @Prop({ enum: ['truth', 'lie'], required: true })
//   guess: 'truth' | 'lie';
// }

// export const VoteSchema = SchemaFactory.createForClass(Vote);

// src/votes/vote.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Statement } from '../statements/statement.schema';

@Schema()
export class Vote extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  voter: User | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Statement.name, required: true })
  statement: Statement | Types.ObjectId;

  @Prop({ required: true, enum: ['truth', 'lie'] })
  guess: 'truth' | 'lie';
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
