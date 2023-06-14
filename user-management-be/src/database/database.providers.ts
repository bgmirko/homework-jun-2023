import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/user/user.entity';
const config = require('./config/config.js');

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const env = process.env.NODE_ENV || 'development';
      const sequelize = new Sequelize(config[env]);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
