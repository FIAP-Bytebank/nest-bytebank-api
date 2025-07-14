import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RegisterAccountDto, ReqLoanDto } from './dto/create-account.dto';
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

  // TO-DO: create loan

  @Patch(':id/emprestimo')
  async updateLoanStatus(
    @Param('id') id: string,
    @Body() loanBody: ReqLoanDto
  ) {
    return await this.accountService.updateLoanStatus(id, loanBody);
  }

  @Put(':id/emprestimo/new')
  async addNewLoan(@Param('id') id: string, @Body() loanBody: ReqLoanDto) {
    return await this.accountService.addNewLoan(id, loanBody);
  }

  @Patch(':id/emprestimo/delete')
  async deleteLoan(@Param('id') id: string, @Query('loanId') loanId: string) {
    return await this.accountService.deleteLoan(id, loanId);
  }
}
