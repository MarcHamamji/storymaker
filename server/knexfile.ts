import config from './src/utils/config';

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: config.POSTGRES_HOST,
      db: config.POSTGRES_DB,
      user: config.POSTGRES_USER,
      password: config.POSTGRES_PASSWORD,
      port: config.POSTGRES_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/migrations/',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      host: config.POSTGRES_HOST,
      db: config.POSTGRES_DB,
      user: config.POSTGRES_USER,
      password: config.POSTGRES_PASSWORD,
      port: config.POSTGRES_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/migrations/',
    },
  },
};
