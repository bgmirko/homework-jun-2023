import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';

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
}
