import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, discriminatorKey: 'tipo' })
export class TransferenciaBase {
  @Prop()
  _id: string;

  @Prop()
  valor: number;

  @Prop()
  data: string;
}
export const TransferenciaBaseSchema =
  SchemaFactory.createForClass(TransferenciaBase);
