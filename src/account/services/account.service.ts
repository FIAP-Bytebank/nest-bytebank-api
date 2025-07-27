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

  async listAccountByCpf(userCpf: string, query: Query): Promise<any> {
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

    const totalItems = transacoes.length;
    const itemsPage = Number(query.itemsPage) || totalItems;
    const currentPage = Number(query.currentPage) || 1;

    const inicio = itemsPage * (currentPage - 1);
    const fim = inicio + itemsPage;

    transacoes = transacoes.slice(inicio, fim);

    const paginacao = {
      totalItems,
      itemsPage,
      currentPage,
    };

    return { account, transacoesList: { transacoes, paginacao } };
  }
}
