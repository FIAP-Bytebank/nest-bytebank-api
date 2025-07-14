import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './../../account/account.schema/account.schema';
import { RegisterAccountDto } from './../../account/dto/create-account.dto';
import mongoose from 'mongoose';

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
}
