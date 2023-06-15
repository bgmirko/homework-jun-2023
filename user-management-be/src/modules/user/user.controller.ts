import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(@Req() req) {
    return this.userService.getUserById(req.user?.uuid);
  }

  @Get()
  async getUsers(@Query() query) {
    return this.userService.getUsers(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
}
