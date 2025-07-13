import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, discriminatorKey: '_type' })
export class TransferenciaBase {
  @Prop()
  id: string;

  @Prop()
  valor: number;

  @Prop()
  data: string;
}
export const TransferenciaBaseSchema =
  SchemaFactory.createForClass(TransferenciaBase);
