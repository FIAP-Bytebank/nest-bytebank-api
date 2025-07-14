import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './account.schema/account.schema';
import mongoose from 'mongoose';
import { RegisterAccountDto } from './dto/create-account.dto';
import { ReqLoan } from './account.schema/account-loans.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: mongoose.Model<Account>
  ) {}

  async createAccount(acc: RegisterAccountDto): Promise<RegisterAccountDto> {
    const response = await this.accountModel.create(acc);
    return response;
  }

  // paying loan debit
  async updateLoanStatus(id: string, loanBody: ReqLoan) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    let targetLoan: ReqLoan | any = {};

    for (let i = 0; i < account.historicoEmprestimos.length; i++) {
      if (account.historicoEmprestimos[i].id === loanBody.id) {
        targetLoan = account.historicoEmprestimos[i];

        if (!targetLoan) {
          throw new NotFoundException(
            `Não foi possível localizar o empréstimo id ${loanBody.id}`
          );
        }

        let resValorDevido = targetLoan.valorDevido - loanBody.valorPago;
        let isLoanOpen = resValorDevido > 0;

        let body = {
          ...loanBody,
          valorDevido: resValorDevido,
          aberto: isLoanOpen,
          valorPago: targetLoan.valorPago + loanBody.valorPago,
        };

        const parsedLoans = account.historicoEmprestimos.map((l: any) =>
          String(l.id) === String(targetLoan.id) ? { ...l, ...body } : l
        );

        const updatedLoan = {
          ...account.toObject(),
          saldo: loanBody.valorPago + account.saldo,
          historicoEmprestimos: parsedLoans,
        };

        return await this.accountModel.findByIdAndUpdate(id, updatedLoan, {
          new: true,
        });
      }
    }

    return;
  }

  async addNewLoan(id: string, loanBody: ReqLoan) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    let formatedLoan = {
      ...loanBody,
      aberto: true,
      valorDevido: loanBody.valor,
      valorPago: 0,
    };

    let body = {
      ...account.toObject(),
      saldo: account.saldo - loanBody.valor,
      historicoEmprestimos: [...account.historicoEmprestimos, formatedLoan],
    };

    return await this.accountModel.findByIdAndUpdate(id, body, { new: true });
  }

  async deleteLoan(id: string, loanId: string) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    let targetLoan: ReqLoan | any = {};

    for (let i = 0; i < account.historicoEmprestimos.length; i++) {
      if (account.historicoEmprestimos[i].id === loanId) {
        targetLoan = account.historicoEmprestimos[i];

        if (!targetLoan) {
          throw new NotFoundException(
            `Não foi possível localizar o empréstimo id ${loanId}`
          );
        }

        const parsedLoans = account.historicoEmprestimos.filter(
          (l: any) => String(l.id) !== String(targetLoan.id)
        );

        const updatedLoan = {
          ...account.toObject(),
          saldo: account.saldo + targetLoan.valorPago,
          historicoEmprestimos: parsedLoans,
        };

        return await this.accountModel.findByIdAndUpdate(id, updatedLoan, {
          new: true,
        });
      }
    }

    return;
  }
}
