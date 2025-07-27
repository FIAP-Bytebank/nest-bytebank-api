import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DadosBancarios } from './user-data.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  user_name: string;

  @Prop()
  nome: string;

  @Prop()
  cpf: string;

  @Prop()
  dataNascimento: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
