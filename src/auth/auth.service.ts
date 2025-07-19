import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './../user/schema/user/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ 'login.email': email });

    if (!user) {
      throw new NotFoundException(
        'Credenciais estão incorretas ou não foram registradas.'
      );
    }

    const isPassValid = password === user.login.password;

    if (!isPassValid) {
      throw new UnauthorizedException(
        'Credenciais inválidas.',
        process.env.JWT_SECRET
      );
    }

    const { password: _, ...result } = user.toObject().login;
    return result;
  }

  async loginUser(user: any) {
    const payload = { id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
