import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TransacationTypes } from '../../shared/utils/transaction-types';
import { TransferenciaBase } from './utils/transaction-t.schema';

export class TransTed extends TransferenciaBase {
  @Prop()
  cpfDestinatario: string;

  @Prop()
  numConta: number;

  @Prop()
  agencia: string;

  @Prop()
  digito: number;

  @Prop()
  descricao: string;

  @Prop()
  file: string;
}

export class TransPix extends TransferenciaBase {
  @Prop()
  destinatario: string;

  @Prop()
  descricao: string;

  @Prop()
  file: string;
}

export class TransDeposit {
  @Prop()
  id: string;

  @Prop()
  valor: number;

  @Prop()
  data: string;

  @Prop()
  tipo: TransacationTypes.DEPOSITO;

  @Prop()
  file: string;
}

export const TransTedSchema = SchemaFactory.createForClass(TransTed);
export const TransPixSchema = SchemaFactory.createForClass(TransPix);
