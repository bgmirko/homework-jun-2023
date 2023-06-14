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
