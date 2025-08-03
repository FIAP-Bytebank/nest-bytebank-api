import {
  Injectable,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from '../account.schema/account.schema';
import mongoose from 'mongoose';
import { RegisterAccountDto } from '../dto/create-account.dto';
import { ReqLoan } from '../account.schema/account-loans.schema';

@Injectable()
export class LoanService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: mongoose.Model<Account>
  ) {}

  /* ==== START LOAN ==== */
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

    if (account.linhaCredito < loanBody.valor) {
      throw new MethodNotAllowedException(
        `Não é possível solicitar R$ ${loanBody.valor} pois a quantia é acima da sua linha de crédito (R$ ${account.linhaCredito})`
      );
    }

    let body = {
      ...account.toObject(),
      linhaCredito: account.linhaCredito - loanBody.valor,
      historicoEmprestimos: [...account.historicoEmprestimos, formatedLoan],
    };

    return await this.accountModel.findByIdAndUpdate(id, body, { new: true });
  }

  async payLoan(id: string, loanBody: ReqLoan) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    let targetLoan = account.historicoEmprestimos.find(
      (ln: ReqLoan) => ln.id === loanBody.id
    );

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
      linhaCredito: account.linhaCredito + loanBody.valorPago,
      historicoEmprestimos: parsedLoans,
    };

    return await this.accountModel.findByIdAndUpdate(id, updatedLoan, {
      new: true,
    });
  }

  async editLoan(id: string, loanBody: ReqLoan) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    let targetLoan = account.historicoEmprestimos.find(
      (ln: ReqLoan) => ln.id === loanBody.id
    );

    if (!targetLoan) {
      throw new NotFoundException(
        `Não foi possível localizar o empréstimo id ${loanBody.id}`
      );
    }

    if (targetLoan.valorPago && targetLoan.valor) {
      if (
        targetLoan.valorPago === loanBody.valorPago &&
        targetLoan.valor === loanBody.valor
      ) {
        throw new NotAcceptableException(
          'Não houve nenhuma alteração dos dados. Logo, não é possível atualizar.'
        );
      }
    }

    account.linhaCredito + targetLoan.valor;

    let resValorDevido = loanBody.valor - loanBody.valorPago;
    let isLoanOpen = resValorDevido > 0;

    let body = {
      ...loanBody,
      valorPago: 0 + loanBody.valorPago || 0,
      aberto: isLoanOpen,
      valorDevido: resValorDevido,
    };

    if (loanBody.valorPago > loanBody.valor) {
      throw new NotAcceptableException(
        `Não é possível registrar um pagamento maior do que o valor original.`
      );
    }

    const parsedLoans = account.historicoEmprestimos.map((l: any) =>
      String(l.id) === String(targetLoan.id) ? { ...l, ...body } : l
    );

    const diffValor = loanBody.valor - targetLoan.valor;
    const diffValorPago = loanBody.valorPago - targetLoan.valorPago;

    const updatedLoan = {
      ...account.toObject(),
      linhaCredito: account.linhaCredito - diffValor + diffValorPago,
      historicoEmprestimos: parsedLoans,
    };

    return await this.accountModel.findByIdAndUpdate(id, updatedLoan, {
      new: true,
    });
  }

  async deleteLoan(id: string, loanId: string) {
    const account: any = await this.accountModel.findById(id);

    if (!account) {
      throw new NotFoundException(
        `Não foi possível localizar a conta id ${id}`
      );
    }

    let targetLoan = account.historicoEmprestimos.find(
      (ln: ReqLoan) => ln.id === loanId
    );

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
      linhaCredito: account.linhaCredito + targetLoan.valor,
      historicoEmprestimos: parsedLoans,
    };

    return await this.accountModel.findByIdAndUpdate(id, updatedLoan, {
      new: true,
    });
  }
  /* ==== END LOAN ==== */
}
