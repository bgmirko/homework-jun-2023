import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user';
import { ResetPasswordDto } from 'src/utils/definitions';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() body: LoginUserDto) {
    return this.authService.loginUser(body);
  }

  @Post('reset-password')
  async requestPasswordReset(@Body() body: ResetPasswordDto) {
    await this.authService.requestPasswordReset(body.email);
    return { message: 'Password reset link has been sent to your email' };
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: ResetPasswordDto,
  ) {
    await this.authService.resetPassword(token, body.password, body.email);
    return { message: 'Password reset successfully' };
  }
}
