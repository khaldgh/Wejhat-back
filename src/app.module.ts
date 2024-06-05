import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
// import cookieSession from 'cookie-session';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlacesModule } from './places/places.module';
import { CategoriesModule } from './categories/categories.module';
import { CitiesModule } from './cities/cities.module';
import { NeighborhoodsModule } from './neighborhoods/neighborhoods.module';
import { CommentsModule } from './comments/comments.module';
import { UsersFavoritesModule } from './users-favorites/users-favorites.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
// import dbConfig from 'ormconfig';
// import { typeOrmAsyncConfig } from 'typeorm.config';
// import dbConfig from 'ormconfig';
const cookieSession = require('cookie-session');
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get('HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('USER'),
          password: configService.get('PASSWORD'),
          database: configService.get('DATABASE'),
          entities: ['**/*.entity.js'],
          logging:true
          // type: 'mysql',
          // host: 'localhost',
          // port: 3306,
          // username: 'root',
          // password: 'Password',
          // database: 'new_schema',
          // entities: [],
        }),
      inject: [ConfigService]
    }),
    UsersModule,
    PlacesModule,
    CategoriesModule,
    CitiesModule,
    NeighborhoodsModule,
    CommentsModule,
    UsersFavoritesModule,
    SubcategoriesModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
