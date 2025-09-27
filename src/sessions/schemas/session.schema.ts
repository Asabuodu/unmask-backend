// src/sessions/session.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Player } from '../../types';

@Schema()
export class Session extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({
    type: [
      {
        _id: { type: String, required: true },
        name: { type: String, default: '' },
        status: {
          type: String,
          enum: ['active', 'eliminated'],
          default: 'active',
        },
      },
    ],
    default: [],
  })
  players: Player[];

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: 0 })
  round: number;
}
export const SessionSchema = SchemaFactory.createForClass(Session);


// src/users/schemas/users.schema.ts
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);



