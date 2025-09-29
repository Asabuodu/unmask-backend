// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';
// import { User } from '../../users/schemas/users.schema';

// @Schema({ timestamps: true })
// export class Statement extends Document {
//   @Prop({ required: true })
//   text: string;

//   @Prop({ enum: ['truth', 'lie'], required: true })
//   type: 'truth' | 'lie';

//   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
//   owner: User;
// }

// export const StatementSchema = SchemaFactory.createForClass(Statement);

// src/statements/statement.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/users.schema';

@Schema()
export class Statement extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, enum: ['truth', 'lie'] })
  type: 'truth' | 'lie';

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner: User | Types.ObjectId;
}

export const StatementSchema = SchemaFactory.createForClass(Statement);
