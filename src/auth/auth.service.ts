// import {
//   Injectable,
//   //BadRequestException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcryptjs';
// import { User, UserDocument } from '../users/schemas/users.schema';
// import { SignupDto } from './dto/signup.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
//   ) {}

//   private generatePassword(length = 6): string {
//     const chars =
//       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     return Array.from({ length }, () =>
//       chars.charAt(Math.floor(Math.random() * chars.length)),
//     ).join('');
//   }

//   // async signup(
//   //   data: Omit<User, 'password'>,
//   // ): Promise<Omit<User, 'password'> & { generatedPassword: string }> {
//   //   const { email, username } = data;

//   //   const existingUser = await this.userModel.findOne({
//   //     $or: [{ email }, { username }],
//   //   });
//   //   if (existingUser) {
//   //     throw new BadRequestException('Email or username already exists');
//   //   }

//   //   // generate random password
//   //   const plainPassword = this.generatePassword(6);
//   //   const hashedPassword = await bcrypt.hash(plainPassword, 10);

//   //   const newUser = new this.userModel({
//   //     ...data,
//   //     password: hashedPassword,
//   //   });

//   //   const savedUser = await newUser.save();

//   //   // destructure password away
//   //   const { password, ...rest } = savedUser.toObject();
//   //   const safeUser = rest as Omit<User, 'password'>;

//   //   return { ...safeUser, generatedPassword: plainPassword };
//   // }

//   async signup(signupData: SignupDto) {
//   const createdUser = new this.userModel(signupData);
//   return createdUser.save();
// }


//   async login(
//     identifier: string,
//     password: string,
//   ): Promise<{ message: string; user: Omit<User, 'password'> }> {
//     const user = await this.userModel.findOne({
//       $or: [{ email: identifier }, { username: identifier }],
//     });

//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const isMatch = await bcrypt.compare(password, user.password!);
//     if (!isMatch) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const { password: _pw, ...rest } = user.toObject();
//     const safeUser = rest as Omit<User, 'password'>;

//     return { message: 'Login successful', user: safeUser };
//   }
// }


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';
import { SafeUserDto } from './dto/safe-user.dto';
import { toSafeUser } from './utils/map-user';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(signupData: Partial<User>): Promise<SafeUserDto> {
    const hashedPassword = await bcrypt.hash(signupData.password!, 10);
    const newUser = new this.userModel({
      ...signupData,
      password: hashedPassword,
    });
    const saved = await newUser.save();
    return toSafeUser(saved);
  }

  async login(
    identifier: string,
    password: string,
  ): Promise<{ message: string; user: SafeUserDto }> {
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

    return { message: 'Login successful', user: toSafeUser(user) };
  }
  
}
