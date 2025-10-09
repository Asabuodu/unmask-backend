import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // ✅ Allow your Netlify frontend to communicate with backend
  app.enableCors({
    origin: ['https://magenta-granita-69bf83.netlify.app', 'http://localhost:3000'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 5000);
  console.log(`🚀 Server running on ${await app.getUrl()}`);
}
bootstrap();
