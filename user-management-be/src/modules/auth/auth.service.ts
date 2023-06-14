import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshAccessToken,
} from '../../utils/generateTokens';
import {
  ResponseData,
  ResponseTokenData,
  TokenUserPayload,
} from '../../utils/definitions';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
      return {
        success: true,
        accessToken,
        refreshToken,
        message: 'User login successfully',
      } as ResponseTokenData;
    } else {
      return {
        success: false,
        message: 'Username or password are not correct',
      } as ResponseData;
    }
  }
}
