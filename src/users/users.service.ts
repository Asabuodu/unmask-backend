import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(username: string, password: string): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    return this.userModel.create({ username, password: hashed });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async updateStatus(userId: string, status: 'active' | 'eliminated') {
    return this.userModel
      .findByIdAndUpdate(userId, { status }, { new: true })
      .exec();
  }
}
