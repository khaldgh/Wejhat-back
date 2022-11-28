import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(helmet())
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
