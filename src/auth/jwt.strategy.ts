import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './../user/schema/user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `mMHDgs7+3yixrXxaobKhIxmr2fzxR/F1u4orObPshZ4UTGEAyeeDvo2Gl5SqbiMkZvRMglpDl0ctINT9X7Z0sQ`,
    });
  }

  async validate(payload) {
    const { id } = payload;
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('Faça o login para continuar.');
    }

    return user;
  }
}
