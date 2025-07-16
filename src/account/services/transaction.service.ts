import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  TransPix,
  TransTed,
} from './../../account/account.schema/account-transactions.schema';
import { Account } from './../../account/account.schema/account.schema';
import mongoose from 'mongoose';
import { PixDto, TedDto } from './../../account/dto/create-account.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: mongoose.Model<Account>
  ) {}

  async addNewTransaction(id: string, transBody: TransTed | TransPix) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    const transactionAlrExists = account.transferencias.find(
      (tf: TransTed | TransPix) => tf.id === transBody.id
    );

    if (transactionAlrExists) {
      throw new MethodNotAllowedException(
        `Já existe uma transação com o id ${transBody.id}`
      );
    }

    const body = {
      ...account.toObject(),
      saldo: account.saldo - transBody.valor,
      transferencias: [...account.transferencias, transBody],
    };

    return await this.accountModel.findByIdAndUpdate(id, body, { new: true });
  }

  async updateTransaction(id: string, transBody: TransTed | TransPix) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    const targetTransaction = account.transferencias.find(
      (tf: TransTed | TransPix) => tf.id === transBody.id
    );

    if (!targetTransaction) {
      throw new NotFoundException(
        `Não foi possível localizar a transferência id ${transBody.id}`
      );
    }

    const filteredTransactions = account.transferencias.filter(
      (tf: TransTed | TransPix) =>
        String(tf.id) !== String(targetTransaction.id)
    );

    let resetSaldo = account.saldo + targetTransaction.valor;

    let body = {
      ...account.toObject(),
      saldo: resetSaldo - transBody.valor,
      transferencias: [...filteredTransactions, transBody],
    };

    return await this.accountModel.findByIdAndUpdate(id, body, { new: true });
  }

  async deleteTransaction(id: string, transId: string) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    const targetTransaction = account.transferencias.find(
      (tf: TransTed | TransPix) => tf.id === transId
    );

    if (!targetTransaction) {
      throw new NotFoundException(
        `Não foi possível localizar a transferência id ${transId}`
      );
    }

    const filteredTransactions = account.transferencias.filter(
      (tf: TransTed | TransPix) => tf.id !== targetTransaction.id
    );

    let body = {
      ...account.toObject(),
      saldo: account.saldo + targetTransaction.valor,
      transferencias: filteredTransactions,
    };

    return await this.accountModel.findByIdAndUpdate(id, body, { new: true });
  }
}
