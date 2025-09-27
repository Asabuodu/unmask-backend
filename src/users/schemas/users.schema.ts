import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: false }) // 👈 now optional, we generate internally
  password?: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  preferredname: string;

  @Prop()
  age: number;

  @Prop()
  phonenumber: string;

  @Prop()
  stateOfOrigin: string;

  @Prop()
  educationLevel: string;

  @Prop()
  trade: string;

  @Prop()
  address: string;

  @Prop()
  toolkit: string;

  @Prop()
  profilePicture: string;

  @Prop({ default: 0 })
  amount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
// users.schema.ts
export type UserDocument = User & Document;

