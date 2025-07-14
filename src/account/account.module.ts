import { AccountService } from './services/account.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema/account.schema';
import { AccountController } from './account.controller';
import {
  TransPixSchema,
  TransTedSchema,
} from './account.schema/account-transactions.schema';
import { LoanService } from './services/loan.service';
import { DepositService } from './services/deposit.service';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Account.name,
        useFactory: () => {
          const schema = AccountSchema;

          const path = AccountSchema.path('transferencias');

          if ('schema' in path) {
            path.schema.discriminator('TED', TransTedSchema);

            path.schema.discriminator('PIX', TransPixSchema);
          }

          return schema;
        },
      },
    ]),
  ],
  providers: [AccountService, LoanService, DepositService, TransactionService],
  controllers: [AccountController],
})
export class AccountModule {}
