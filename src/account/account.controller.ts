import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('register')
  async registerAccount(
    @Body() account: RegisterAccountDto
  ): Promise<RegisterAccountDto> {
    return await this.accountService.createAccount(account);
  }
}
