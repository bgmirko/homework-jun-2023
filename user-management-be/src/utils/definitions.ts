import { User } from '../../src/modules/user/user.entity';

export interface TokenUserPayload {
  uuid: string;
  fullName: string;
  email: string;
}

export interface ResponseData {
  message: string;
  success: boolean;
}

export interface ResponseTokenData extends ResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface ResetPasswordDto {
  email: string;
  password: string;
}

export interface RequestCustom extends Request {
  user: User;
}
