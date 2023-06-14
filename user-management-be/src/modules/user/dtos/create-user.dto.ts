import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
