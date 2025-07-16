import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransDeposit } from '../account.schema/account-transactions.schema';
import { Account } from '../account.schema/account.schema';
import { DepositDto } from '../dto/create-account.dto';
import mongoose from 'mongoose';

@Injectable()
export class DepositService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: mongoose.Model<Account>
  ) {}

  async addNewDeposit(id: string, depositBody: TransDeposit): Promise<any> {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    let body = {
      ...account.toObject(),
      saldo: account.saldo + depositBody.valor,
      depositos: [...account.depositos, depositBody],
    };

    return await this.accountModel.findByIdAndUpdate(id, body, { new: true });
  }

  async updateDeposit(id: string, depositBody: TransDeposit) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    const targetDeposit = account.depositos.find(
      (acc: TransDeposit) => acc.id === depositBody.id
    );

    if (!targetDeposit) {
      throw new NotFoundException(
        `Não foi possível localizar o depósito id ${id}`
      );
    }

    const parsedDeposits = account.depositos.map((accDep: TransDeposit) =>
      accDep.id === targetDeposit.id ? { ...accDep, ...depositBody } : accDep
    );

    const resetBalancce = account.saldo - targetDeposit.valor;

    const body = {
      ...account.toObject(),
      saldo: resetBalancce + depositBody.valor,
      depositos: parsedDeposits,
    };

    return await this.accountModel.findByIdAndUpdate(id, body, { new: true });
  }

  async deleteDeposit(id: string, depositId: string) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    const targetDeposit = account.depositos.find(
      (acc: TransDeposit) => acc.id === depositId
    );

    if (!targetDeposit) {
      throw new NotFoundException(
        `Não foi possível localizar o depósito id ${id}`
      );
    }

    const parsedDeposits = account.depositos.filter(
      (accDep: TransDeposit) => accDep.id !== depositId
    );

    const body = {
      ...account.toObject(),
      saldo: account.saldo - targetDeposit.valor,
      depositos: parsedDeposits,
    };

    return await this.accountModel.findByIdAndUpdate(id, body, { new: true });
  }
}
