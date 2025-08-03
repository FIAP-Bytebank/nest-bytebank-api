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

export class DepositDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsNotEmpty()
  data: string;

  @Equals(TransacationTypes.DEPOSITO, { message: 'O tipo deve ser DEPOSITO' })
  @IsNotEmpty()
  tipo: TransacationTypes.DEPOSITO;

  file: string;
}

export class TedDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

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

  file: string;
}

export class PixDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

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
  destinatario: string;

  file: string;
}

export class ReqLoanDto {
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

  @IsNumber()
  @IsNotEmpty()
  valorPago: number;

  @IsNumber()
  @IsNotEmpty()
  valorDevido: number;

  @Equals(TransacationTypes.EMPRESTIMO, {
    message: 'O tipo deve ser EMPRESTIMO.',
  })
  @IsNotEmpty()
  tipo: TransacationTypes.EMPRESTIMO;

  file: string;
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
