import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './account.schema/account.schema';
import mongoose from 'mongoose';
import { RegisterAccountDto } from './dto/create-account.dto';

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
}
