import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  TransDeposit,
  TransPix,
  TransTed,
} from './account-transactions.schema';
import { ReqLoan } from './account-loans.schema';
import { TransferenciaBaseSchema } from './utils/transaction-t.schema';

@Schema({
  timestamps: true,
})
export class Account {
  @Prop()
  numeroConta: string;

  @Prop()
  digito: number;

  @Prop()
  usuarioCpf: string;

  @Prop()
  linhaCredito: number;

  @Prop()
  agencia: string;

  @Prop()
  saldo: number;

  @Prop({
    type: () => [TransDeposit],
    default: [],
  })
  depositos: TransDeposit[];

  @Prop({
    type: [TransferenciaBaseSchema],
    default: [],
  })
  transferencias: (TransTed | TransPix)[];

  @Prop({ type: () => [ReqLoan], default: [] })
  historicoEmprestimos: ReqLoan[];
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
