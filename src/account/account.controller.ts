import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  DepositDto,
  PixDto,
  RegisterAccountDto,
  ReqLoanDto,
  TedDto,
} from './dto/create-account.dto';
import { LoanService } from './services/loan.service';
import { DepositService } from './services/deposit.service';
import { TransactionService } from './services/transaction.service';
import { AccountService } from './services/account.service';

@Controller('account')
export class AccountController {
  constructor(
    private loanService: LoanService,
    private depositService: DepositService,
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  // creates bank account
  @Post('register')
  async registerAccount(
    @Body() account: RegisterAccountDto
  ): Promise<RegisterAccountDto> {
    return await this.accountService.createAccount(account);
  }

  @Get()
  async listAllAccounts(): Promise<RegisterAccountDto[]> {
    return await this.accountService.listAllAccounts();
  }

  /* ==== START LOAN ==== */
  @Put(':id/loan/new') // adds new loan
  async addNewLoan(@Param('id') id: string, @Body() loanBody: ReqLoanDto) {
    return await this.loanService.addNewLoan(id, loanBody);
  }

  @Patch(':id/loan') // updates loan
  async updateLoanStatus(
    @Param('id') id: string,
    @Body() loanBody: ReqLoanDto
  ) {
    return await this.loanService.updateLoanStatus(id, loanBody);
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

  @Patch(':id/deposit/delete') // deletes deposit
  async deleteDeposit(
    @Param('id') id: string,
    @Query('depositId') depositId: string
  ) {
    return await this.depositService.deleteDeposit(id, depositId);
  }
  /* ==== END DEPOSIT ==== */

  /* ==== START DEPOSIT ==== */
  @Put(':id/transaction/new')
  async addNewTransaction(
    @Param('id') id: string,
    @Body() body: TedDto | PixDto
  ) {
    return await this.transactionService.addNewTransaction(id, body);
  }

  @Patch(':id/transaction')
  async updateTransaction(
    @Param('id') id: string,
    @Body() body: TedDto | PixDto
  ) {
    return await this.transactionService.updateTransaction(id, body);
  }

  @Patch(':id/transaction/delete') // deletes deposit
  async deleteTransaction(
    @Param('id') id: string,
    @Query('transId') transId: string
  ) {
    return await this.transactionService.deleteTransaction(id, transId);
  }
  /* ==== END DEPOSIT ==== */
}
