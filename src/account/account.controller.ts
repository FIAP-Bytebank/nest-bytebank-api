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
import {
  DepositDto,
  RegisterAccountDto,
  ReqLoanDto,
} from './dto/create-account.dto';
import { LoanService } from './services/loan.service';
import { DepositService } from './services/deposit.service';

@Controller('account')
export class AccountController {
  constructor(
    private loanService: LoanService,
    private depositService: DepositService
  ) {}

  // creates bank account
  @Post('register')
  async registerAccount(
    @Body() account: RegisterAccountDto
  ): Promise<RegisterAccountDto> {
    return await this.loanService.createAccount(account);
  }

  /* ==== START LOAN ==== */
  @Patch(':id/loan') // updates loan
  async updateLoanStatus(
    @Param('id') id: string,
    @Body() loanBody: ReqLoanDto
  ) {
    return await this.loanService.updateLoanStatus(id, loanBody);
  }

  @Put(':id/loan/new') // adds new loan
  async addNewLoan(@Param('id') id: string, @Body() loanBody: ReqLoanDto) {
    return await this.loanService.addNewLoan(id, loanBody);
  }

  @Patch(':id/loan/delete') //deletes loan
  async deleteLoan(@Param('id') id: string, @Query('loanId') loanId: string) {
    return await this.loanService.deleteLoan(id, loanId);
  }
  /* ==== END LOAN ==== */

  /* ==== START DEPOSIT ==== */
  @Put(':id/deposit/new') // creates new deposit
  async addNewDeposit(
    @Param('id') id: string,
    @Body() account: DepositDto
  ): Promise<DepositDto> {
    return await this.depositService.addNewDeposit(id, account);
  }

  @Patch(':id/deposit') // updates deposit
  async updateDeposit(
    @Param('id') id: string,
    @Body() depositBody: DepositDto
  ) {
    return await this.depositService.updateDeposit(id, depositBody);
  }

  @Patch(':id/deposit/delete') // updates deposit
  async deleteDeposit(
    @Param('id') id: string,
    @Query('depositId') depositId: string
  ) {
    return await this.depositService.deleteDeposit(id, depositId);
  }
  /* ==== END DEPOSIT ==== */
}
