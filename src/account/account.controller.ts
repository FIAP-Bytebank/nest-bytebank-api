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
  Request,
  UseGuards,
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
import { JWTAuthGuard } from './../auth/jwt-auth.guard';
import { Query as ExpressQuery } from 'express-serve-static-core';

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

  @Get('all')
  async listAllAccounts(): Promise<RegisterAccountDto[]> {
    return await this.accountService.listAllAccounts();
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  async listAccountByCpf(
    @Query('usuarioCpf') usuarioCpf: string,
    @Query() query: ExpressQuery
  ) {
    return await this.accountService.listAccountByCpf(usuarioCpf, query);
  }

  /* ==== START LOAN ==== */
  @UseGuards(JWTAuthGuard)
  @Put(':id/loan/new') // adds new loan
  async addNewLoan(@Param('id') id: string, @Body() loanBody: ReqLoanDto) {
    return await this.loanService.addNewLoan(id, loanBody);
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id/loan') // updates loan
  async updateLoanStatus(
    @Param('id') id: string,
    @Body() loanBody: ReqLoanDto
  ) {
    return await this.loanService.payLoan(id, loanBody);
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id/loan/edit')
  async editLoan(@Param('id') id: string, @Body() loanBody: ReqLoanDto) {
    return await this.loanService.editLoan(id, loanBody);
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id/loan/delete') //deletes loan
  async deleteLoan(@Param('id') id: string, @Query('loanId') loanId: string) {
    return await this.loanService.deleteLoan(id, loanId);
  }
  /* ==== END LOAN ==== */

  /* ==== START DEPOSIT ==== */
  @UseGuards(JWTAuthGuard)
  @Put(':id/deposit/new') // creates new deposit
  async addNewDeposit(
    @Param('id') id: string,
    @Body() account: DepositDto
  ): Promise<DepositDto> {
    return await this.depositService.addNewDeposit(id, account);
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id/deposit') // updates deposit
  async updateDeposit(
    @Param('id') id: string,
    @Body() depositBody: DepositDto
  ) {
    return await this.depositService.updateDeposit(id, depositBody);
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id/deposit/delete') // deletes deposit
  async deleteDeposit(
    @Param('id') id: string,
    @Query('depositId') depositId: string
  ) {
    return await this.depositService.deleteDeposit(id, depositId);
  }
  /* ==== END DEPOSIT ==== */

  /* ==== START DEPOSIT ==== */
  @UseGuards(JWTAuthGuard)
  @Put(':id/transaction/new')
  async addNewTransaction(
    @Param('id') id: string,
    @Body() body: TedDto | PixDto
  ) {
    return await this.transactionService.addNewTransaction(id, body);
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id/transaction')
  async updateTransaction(
    @Param('id') id: string,
    @Body() body: TedDto | PixDto
  ) {
    return await this.transactionService.updateTransaction(id, body);
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id/transaction/delete') // deletes deposit
  async deleteTransaction(
    @Param('id') id: string,
    @Query('transId') transId: string
  ) {
    return await this.transactionService.deleteTransaction(id, transId);
  }
  /* ==== END DEPOSIT ==== */
}
