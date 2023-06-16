import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { users } from '../../utils/dummy-data';
import { BadRequestException } from '@nestjs/common';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers: jest.fn().mockResolvedValue(users),
            createUser: jest.fn(),
            getUserByEmail: jest.fn(),
            getUserById: jest.fn(),
            updateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    mockUserService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return users', async () => {
      const mockQuery = {};
      const result = await controller.getUsers(mockQuery);

      expect(result).toEqual(users);
      expect(mockUserService.getUsers).toHaveBeenCalledWith(mockQuery);
    });
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const createUserDto = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };

      await controller.createUser(createUserDto);

      expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw BadRequestException if user already exists', async () => {
      const createUserDto = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };

      jest.spyOn(mockUserService, 'getUserByEmail').mockResolvedValueOnce({
        uuid: 'user-uuid',
        fullName: 'User 1',
        email: 'user@example.com',
        password: 'hashedPassword',
        resetToken: null,
      } as User);

      await expect(controller.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
