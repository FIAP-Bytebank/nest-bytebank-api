import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TransacationTypes } from '../../shared/utils/transaction-types';
import { TransferenciaBase } from './utils/transaction-t.schema';

@Schema()
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
  tipo: TransacationTypes.TED;
}

@Schema()
export class TransPix extends TransferenciaBase {
  @Prop()
  chavePix: string;

  @Prop()
  destinatario: string;

  @Prop()
  descricao: string;
  @Prop()
  tipo: TransacationTypes.PIX;
}

@Schema({
  timestamps: true,
})
export class TransDeposit {
  @Prop()
  id: string;

  @Prop()
  valor: number;

  @Prop()
  data: string;

  @Prop()
  tipo: TransacationTypes.DEPOSITO;
}

export const TransTedSchema = SchemaFactory.createForClass(TransTed);
export const TransPixSchema = SchemaFactory.createForClass(TransPix);
