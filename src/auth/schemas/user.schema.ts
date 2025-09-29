import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  preferredname: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phonenumber: string;

  @Prop({ required: true })
  stateOfOrigin: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  educationLevel: string;

  @Prop({ required: true })
  trade: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  toolkit: string;

  @Prop()
  profilePicture: string;

  @Prop({ default: 0 })
  amount: number;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
