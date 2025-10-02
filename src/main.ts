
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      '*',
      //'http://localhost:5173',
      'http://localhost:3000',
      // 'https://unmask-frontend.vercel.app',
      // 'https://unmask-frontend-git-dev-tolulope.vercel.app',
      // 'https://unmask-frontend-git-main-tolulope.vercel.app',
      
    ], // Allow all origins
  });

  console.log('🌐 CORS enabled for all origins');
  console.log('🔧 Global prefix set to /api');

  await app.listen(process.env.PORT ?? 3000);

  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((err) => {
  console.error('❌ Error starting server:', err);
});