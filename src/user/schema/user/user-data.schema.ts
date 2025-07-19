import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class DadosBancarios {
  @Prop()
  numeroConta: string;

  @Prop()
  agencia: string;

  @Prop()
  digito: number;

  @Prop()
  chavePix: string;
}

@Schema()
export class Login {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  refreshToken: string;
}
