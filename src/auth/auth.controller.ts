import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SafeUserDto } from './dto/safe-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupDto): Promise<{ message: string; user: SafeUserDto }> {
    const user = await this.authService.signup(body);
    return { message: 'Signup successful', user };
  }

  @Post('login')
  async login(@Body() body: { identifier: string; password: string }) {
    return this.authService.login(body.identifier, body.password);
  }
}
