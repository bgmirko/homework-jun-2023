import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async getUsers(query): Promise<{ count: number; rows: User[] }> {
    return this.usersRepository.findAndCountAll({
      attributes: { exclude: ['password'] },
      offset: query?.cursor ?? 0,
      limit: query?.limit ?? 10,
    });
  }

  async createUser(body: CreateUserDto): Promise<User> {
    return this.usersRepository.create({
      ...body,
      ...(body.password && { password: await hash(body.password, 12) }),
    });
  }
}
