import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DadosBancarios, Login } from './user-data.schema';

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

  @Prop({ type: () => Login, required: true })
  login: Login;

  @Prop({ type: () => DadosBancarios, required: true })
  dadosBancarios: DadosBancarios;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
