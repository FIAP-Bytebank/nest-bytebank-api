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

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
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
  providers: [LoanService, DepositService],
  controllers: [AccountController],
})
export class AccountModule {}
