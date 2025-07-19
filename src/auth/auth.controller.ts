import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './../user/dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() loginBody: LoginDto) {
    const user = this.authService.validateUser(
      loginBody.email,
      loginBody.password
    );
    return this.authService.loginUser(user);
  }
}
