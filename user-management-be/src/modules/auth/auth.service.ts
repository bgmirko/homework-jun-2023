import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import {
  generateAccessToken,
  generateRandomToken,
  generateRefreshAccessToken,
} from '../../utils/generateTokens';
import {
  ResponseData,
  ResponseTokenData,
  TokenUserPayload,
} from '../../utils/definitions';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sendGridService: SendGridService,
  ) {}

  async loginUser(body: LoginUserDto) {
    const password: string = body.password;
    const email: string = body.email;

    const user = await this.userService.getUserByEmail(email);

    if (user == null) {
      return new NotFoundException("User doesn't exists");
    }

    if (await compare(password, user.password)) {
      const userTokenData: TokenUserPayload = {
        uuid: user.uuid,
        fullName: user.fullName,
        email: user.email,
      };
      const accessToken = generateAccessToken(userTokenData);
      const refreshToken = generateRefreshAccessToken(userTokenData);

      delete user.password;

      return {
        success: true,
        accessToken,
        refreshToken,
        message: 'User login successfully',
        user: user,
      } as ResponseTokenData;
    } else {
      return {
        success: false,
        message: 'Username or password are not correct',
      } as ResponseData;
    }
  }

  async requestPasswordReset(email: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    const resetToken = generateRandomToken(32);

    this.userService.updateUser(user.uuid, { resetToken });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    const emailData = {
      to: user.email,
      from: 'mirkojanuar@gmail.com',
      subject: 'Password Reset',
      text: `Please click the following link to reset your password: ${resetLink}`,
    };

    return this.sendGridService.send(emailData);
  }

  async resetPassword(token: string, newPassword: string, email: string) {
    const user = await this.userService.getUserByEmail(email);

    if (user.resetToken !== token) {
      throw new NotFoundException('Invalid or expired token');
    }

    const hashedPassword = await hash(newPassword, 12);

    return this.userService.updateUser(user.uuid, {
      password: hashedPassword,
      resetToken: null,
    });
  }
}
