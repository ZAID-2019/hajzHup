import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Define CORS options
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001', // Allow your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 204, // Success status for OPTIONS requests (preflight)
  };

  app.enableCors(corsOptions); // Enable CORS with specified options
  await app.listen(3090);
}
bootstrap();
