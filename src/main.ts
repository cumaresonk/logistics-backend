// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend app on localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000',  // Frontend URL
    methods: 'GET, POST, OPTIONS',  // Allow these methods
    allowedHeaders: 'Content-Type, Authorization', // Headers allowed
    credentials: true,  // Allow credentials like cookies or authorization headers
  });

  await app.listen(3001); // Ensure the server listens on 3001 or the correct backend port
}
bootstrap();
