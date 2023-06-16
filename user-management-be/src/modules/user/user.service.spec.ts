import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { hash } from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  const mockUsersRepository = {
    findAndCountAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const mockHashedPassword = 'mockHashedPassword';

  beforeEach(async () => {
    (hash as jest.Mock).mockResolvedValue(mockHashedPassword);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USERS_REPOSITORY',
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return users with correct attributes', async () => {
      const mockQuery = { cursor: 0, limit: 10 };
      const mockUsersResult = {
        count: 2,
        rows: [
          {
            uuid: 'user-uuid-1',
            fullName: 'Milorad Tomic',
            email: 'milorad@example.com',
          },
          {
            uuid: 'user-uuid-2',
            fullName: 'Jane Smith',
            email: 'jane@example.com',
          },
        ],
      };
      mockUsersRepository.findAndCountAll.mockResolvedValue(mockUsersResult);

      const result = await service.getUsers(mockQuery);

      expect(mockUsersRepository.findAndCountAll).toHaveBeenCalledWith({
        attributes: { exclude: ['password'] },
        offset: mockQuery.cursor,
        limit: mockQuery.limit,
      });
      expect(result).toEqual(mockUsersResult);
    });
  });

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
      const mockUserDto: CreateUserDto = {
        fullName: 'Milorad Tomic',
        email: 'milorad@example.com',
        password: 'password',
      };
      const mockHashedPassword = 'hashedPassword';
      const mockCreatedUser: User = {
        uuid: 'user-uuid',
        fullName: 'Milorad Tomic',
        email: 'milorad@example.com',
        password: mockHashedPassword,
      } as User;
      mockUsersRepository.create.mockResolvedValue(mockCreatedUser);
      hash.mockResolvedValue(mockHashedPassword);

      const result = await service.createUser(mockUserDto);

      expect(hash).toHaveBeenCalledWith(mockUserDto.password, 12);
      expect(mockUsersRepository.create).toHaveBeenCalledWith({
        ...mockUserDto,
        password: mockHashedPassword,
      });
      expect(result).toEqual(mockCreatedUser);
    });
  });

  describe('getUserByEmail', () => {
    it('should return user with the given email', async () => {
      const mockEmail = 'milorad@example.com';
      const mockUser: User = {
        uuid: 'user-uuid',
        fullName: 'Milorad Tomic',
        email: 'milorad@example.com',
      } as User;
      mockUsersRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.getUserByEmail(mockEmail);

      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: {
          email: mockEmail,
        },
        raw: true,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserById', () => {
    it('should return user with the given UUID', async () => {
      const mockUuid = 'user-uuid';
      const mockUser: User = {
        uuid: 'user-uuid',
        fullName: 'Milorad Tomic',
        email: 'milorad@example.com',
      } as User;
      mockUsersRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.getUserById(mockUuid);

      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: {
          uuid: mockUuid,
        },
        attributes: { exclude: ['password'] },
        raw: true,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update user with the given UUID and return the affected count', async () => {
      const mockUuid = 'user-uuid';
      const mockUserData: Partial<User> = {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
      };
      const mockAffectedCount = 1;
      mockUsersRepository.update.mockResolvedValue([mockAffectedCount]);

      const result = await service.updateUser(mockUuid, mockUserData);

      expect(mockUsersRepository.update).toHaveBeenCalledWith(mockUserData, {
        where: {
          uuid: mockUuid,
        },
      });
      expect(result).toEqual(mockAffectedCount);
    });
  });
});
