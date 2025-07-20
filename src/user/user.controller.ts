import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { User } from './schema/user/user.schema';
import { JWTAuthGuard } from './../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDTO): Promise<RegisterUserDTO> {
    return await this.userService.registerUser(user);
  }

  @Get()
  async listAllUsers(): Promise<User[]> {
    return await this.userService.listAllUsers();
  }

  @UseGuards(JWTAuthGuard)
  @Get('one')
  async listAccount(@Request() req) {
    return req.user;
  }

  @Put(':id')
  async updateUserAccount(
    @Param('id') id: string,
    @Body() updatedUser: User
  ): Promise<User> {
    return await this.userService.updateUserAccount(id, updatedUser);
  }
}
