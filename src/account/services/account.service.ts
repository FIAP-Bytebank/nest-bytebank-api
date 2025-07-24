import { Injectable, NotFoundException } from '@nestjs/common';
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

    const { depositos, transferencias, historicoEmprestimos, ...account } =
      parsedAccount;

    let transactions: any[] = [];
    let transacoes = transactions.concat(
      depositos || [],
      transferencias || [],
      historicoEmprestimos || []
    );

    const itemsPagina = Number(query.itemsPage) || 5;
    const paginaAtual = Number(query.page) || 1;

    const inicio = itemsPagina * (paginaAtual - 1);
    const fim = inicio + itemsPagina;

    transacoes = transacoes.slice(inicio, fim);

    const paginacao = {
      totalItems: transacoes.length,
      itemsPagina,
      paginaAtual,
    };

    return { account, transacoesList: { transacoes, paginacao } };
  }
}
