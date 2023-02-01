// const { AppDataSource } = require("src/datasource");

var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, 
      {
      type: 'mysql',
      database: 'new_schema',
      entities: ['**/*.entity.js'],
      username: 'root',
      password: 'Password',
      host: 'localhost',
      port: 3306,
      logging: true,
    }
    );
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'mysql',
      database: 'test_db',
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'mysql',
      url: process.env.CLEARDB_DATABASE_URL,
      logging: true,

      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unknown environment');
}
module.exports = dbConfig;
