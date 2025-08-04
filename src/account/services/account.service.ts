import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './../../account/account.schema/account.schema';
import { RegisterAccountDto } from './../../account/dto/create-account.dto';
import mongoose from 'mongoose';

import { Query } from 'express-serve-static-core';
@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: mongoose.Model<Account>
  ) {}

  // creates bank account
  async createAccount(acc: RegisterAccountDto): Promise<RegisterAccountDto> {
    const cpfExists = await this.accountModel.findOne({
      usuarioCpf: acc.usuarioCpf,
    });

    if (cpfExists) {
      throw new ConflictException('CPF já está relacionado com outra conta.');
    }

    return await this.accountModel.create(acc);
  }

  async listAllAccounts(): Promise<RegisterAccountDto[]> {
    return await this.accountModel.find();
  }

  async listAccountByCpf(userCpf: string): Promise<any> {
    const targetAccount = await this.accountModel.findOne({
      usuarioCpf: userCpf,
    });

    if (!targetAccount) {
      throw new NotFoundException(
        `Não foi possível encontrar a conta do CPF ${userCpf}`
      );
    }
    const parsedAccount = targetAccount.toObject();

    const { historicoEmprestimos, depositos, transferencias, ...account } =
      parsedAccount;

    let transactions: any[] = [];
    let transacoes = transactions.concat(
      depositos,
      transferencias,
      historicoEmprestimos
    );

    return { account, transacoesList: { transacoes } };
  }
}
