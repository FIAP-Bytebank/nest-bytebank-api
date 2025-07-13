import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema/account.schema';
import { AccountController } from './account.controller';
import {
  TransPixSchema,
  TransTedSchema,
} from './account.schema/account-transactions.schema';

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
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
