import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, discriminatorKey: 'tipo' })
export class TransferenciaBase {
  @Prop()
  transId: string;

  @Prop()
  valor: number;

  @Prop()
  data: string;
}
export const TransferenciaBaseSchema =
  SchemaFactory.createForClass(TransferenciaBase);
