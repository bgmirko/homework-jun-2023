import { User } from '../modules/user/user.entity';

export const users: Partial<User>[] = [
  {
    uuid: '956b086d-f22d-43a3-8966-77d412555c3e',
    fullName: 'Petar Petrovic',
    password: '$2a$12$m55yaasWCQIq6F9X/5K4BeQ9BgMw78JwRv.QAx9.eJ3qvf2R1sgUS',
    email: 'petar@gmail.com',
    resetToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uuid: '333b086d-f22d-43a3-8966-77d412555tgy',
    fullName: 'Ivana Mandic',
    password: '$2a$12$m55yaasWCQIq6F9X/5K4BeQ9BgMw78JwRv.QAx9.eJ3qvf2R1sgUS',
    email: 'ivana@gmail.com',
    resetToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
