
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);

  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((err) => {
  console.error('❌ Error starting server:', err);
});
console.log(bootstrap);
console.trace();