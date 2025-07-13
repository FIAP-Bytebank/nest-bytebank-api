import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class DadosBancariosDto {
  @IsString()
  @IsNotEmpty()
  numeroConta: string;

  @IsString()
  @IsNotEmpty()
  agencia: string;

  @IsNumber()
  digito: number;

  @IsString()
  @IsNotEmpty()
  chavePix: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterUserDTO {
  @IsString({ message: 'Nome deve ser uma sequência de alfanuméricos.' })
  @IsNotEmpty({ message: 'Nome precisa ser informado.' })
  @MinLength(3, { message: 'Nome deve ter mais de 3 caracteres.' })
  nome: string;

  @Length(11, 11, {
    message: 'CPF precisa ter 11 caracteres.',
  })
  @IsNotEmpty({ message: 'CPF precisa ser informado.' })
  cpf: string;

  @IsNotEmpty({ message: 'Data de nascimento precisa ser informada.' })
  @Length(10, 10, { message: 'Data de nascimento deve ter 10 caracteres.' })
  dataNascimento: string;

  @ValidateNested()
  @Type(() => DadosBancariosDto)
  dadosBancarios: DadosBancariosDto;

  @ValidateNested()
  @Type(() => LoginDto)
  login: LoginDto;
}
