import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { User } from './schema/user/user.schema';
import { Login } from './schema/user/user-data.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDTO): Promise<RegisterUserDTO> {
    return await this.userService.registerUser(user);
  }

  @Get()
  async listAllUsers(): Promise<User[]> {
    console.log('buscando por todos');
    return await this.userService.listAllUsers();
  }

  @Get(':id')
  async listUser(@Param('id') id: string): Promise<User> {
    console.log('buscando por ', id);
    return await this.userService.listUser(id);
  }

  @Put(':id')
  async updateUserAccount(
    @Param('id') id: string,
    @Body() updatedUser: User
  ): Promise<User> {
    return await this.userService.updateUserAccount(id, updatedUser);
  }

  @Post('login')
  async loginUser(@Body() loginBody: Login) {
    return await this.userService.loginUser(loginBody);
  }
}
