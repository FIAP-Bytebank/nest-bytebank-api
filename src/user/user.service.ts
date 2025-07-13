import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user/user.schema';
import mongoose from 'mongoose';
import { RegisterUserDTO } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) {}

  async registerUser(user: RegisterUserDTO): Promise<RegisterUserDTO> {
    const response = await this.userModel.create(user);
    return response;
  }

  async listAllUsers(): Promise<User[]> {
    const response = await this.userModel.find();

    return response;
  }

  async listUser(id: string): Promise<User> {
    const response = await this.userModel.findById(id).exec();

    if (!response) {
      throw new NotFoundException(`Usuário id ${id} não foi encontrado.`);
    }

    return response;
  }

  async updateUserAccount(id: string, updatedUser: User): Promise<User> {
    const response = await this.userModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      throw new NotFoundException(`Usuário id ${id} não foi encontrado.`);
    }

    return response;
  }
}
