import { Schema, Prop } from '@nestjs/mongoose';
import { TransacationTypes } from './../../shared/utils/transaction-types';
@Schema({
  timestamps: true,
})
export class ReqLoan {
  @Prop()
  id: string;

  @Prop()
  valor: number;

  @Prop()
  data: string;

  @Prop()
  aberto: boolean;

  @Prop()
  tipo: TransacationTypes.EMPRESTIMO;

  @Prop()
  valorPago: number;

  @Prop()
  valorDevido: number;
}
