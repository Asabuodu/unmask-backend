import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { identifier: string; password: string }) {
    return this.authService.login(body.identifier, body.password);
  }

  @Post('signup')
  async signup(
    @Body()
    body: {
      fullname: string;
      preferredname: string;
      age: number;
      email: string;
      phonenumber: string;
      stateOfOrigin: string;
      username: string;
      educationLevel: string;
      trade: string;
      address: string;
      toolkit: string;
      profilePicture: string;
      amount: number;
    }
  ) {
    return this.authService.signup(body);
  }
}
