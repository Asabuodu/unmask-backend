import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/users.schema';

@Injectable()

// auth.service.ts
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private generatePassword(length = 6): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join('');
  }

  async signup(
    data: Omit<User, 'password'>,
  ): Promise<Omit<User, 'password'> & { generatedPassword: string }> {
    const { email, username } = data;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw new BadRequestException('Email or username already exists');
    }

    // generate password automatically
    const plainPassword = this.generatePassword(6);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = new this.userModel({
      ...data,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password, ...safeUser } = savedUser.toObject();

    return { ...safeUser, generatedPassword: plainPassword };
  }

  async login(
    identifier: string,
    password: string,
  ): Promise<{ message: string; user: Omit<User, 'password'> }> {
    const user = await this.userModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...safeUser } = user.toObject();
    return { message: 'Login successful', user: safeUser };
  }
}
