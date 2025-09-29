// src/votes/vote.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from "../../users/schemas/users.schema";
import { Statement } from '../../statements/schemas/statement.schema';

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
