import { Prop, Schema } from '@nestjs/mongoose';

export class DadosBancarios {
  @Prop()
  numeroConta: string;

  @Prop()
  agencia: string;

  @Prop()
  digito: number;
}
