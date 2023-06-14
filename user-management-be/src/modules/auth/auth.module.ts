import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    SendGridModule.forRoot({
      apikey: process.env.YOUR_SENDGRID_API_KEY,
    }),
  ],
})
export class AuthModule {}
