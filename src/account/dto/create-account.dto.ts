import { Type, TypeHelpOptions } from 'class-transformer';
import {
  Equals,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TransacationTypes } from '../../shared/utils/transaction-types';
import { transferenciaTypeFactory } from '../account.schema/utils/functions/trasnfer-dto-type';

class DepositDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number | string;

  @IsString()
  @IsNotEmpty()
  data: string;

  @Equals(TransacationTypes.DEPOSITO, { message: 'O tipo deve ser DEPOSITO' })
  @IsNotEmpty()
  tipo: TransacationTypes.DEPOSITO;
}

export class TedDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  data: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsNotEmpty()
  cpfDestinatario: string;

  @IsNumber()
  @IsNotEmpty()
  numConta: number;

  @IsString()
  @IsNotEmpty()
  agencia: string;

  @IsNumber()
  @IsNotEmpty()
  digito: number;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @Equals(TransacationTypes.TED, { message: 'O tipo deve ser TED.' })
  @IsNotEmpty()
  tipo: TransacationTypes.TED;
}

export class PixDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  data: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  chavePix: string;

  @IsString()
  @IsNotEmpty()
  destinatario: string;

  @Equals(TransacationTypes.PIX, { message: 'O tipo deve ser PIX.' })
  @IsNotEmpty()
  tipo: TransacationTypes.PIX;
}

class ReqLoanDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsNotEmpty()
  data: string;

  @IsBoolean()
  @IsNotEmpty()
  aberto: boolean;

  @Equals(TransacationTypes.EMPRESTIMO, {
    message: 'O tipo deve ser EMPRESTIMO.',
  })
  @IsNotEmpty()
  tipo: TransacationTypes.EMPRESTIMO;

  @IsNumber()
  @IsNotEmpty()
  valorPago: number;

  @IsNumber()
  @IsNotEmpty()
  valorDevido: number;
}

export class RegisterAccountDto {
  @IsString()
  @IsNotEmpty()
  numeroConta: string;

  @IsNumber()
  @IsNotEmpty()
  digito: number;

  @IsString()
  @IsNotEmpty()
  usuarioCpf: string;

  @IsNumber()
  @IsNotEmpty()
  linhaCredito: number;

  @IsString()
  @IsNotEmpty()
  agencia: string;

  @IsNumber()
  @IsNotEmpty()
  saldo: number;

  @ValidateNested()
  @Type(() => DepositDto)
  @IsOptional()
  depositos: DepositDto[];

  @ValidateNested()
  @Type(({ object }: TypeHelpOptions) => transferenciaTypeFactory(object))
  @IsOptional()
  transferencias: (TedDto | PixDto)[];

  @ValidateNested()
  @Type(() => ReqLoanDto)
  @IsOptional()
  historicoEmprestimos: ReqLoanDto[];
}
