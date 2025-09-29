// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();




import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { Application, RequestHandler } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);

  await app.listen(process.env.PORT ?? 3000);

  // Cast to Express
  const server = app.getHttpServer();
  const expressApp: Application = server._events.request;

  // Type the router properly
  const router = (expressApp as any)._router as {
    stack: Array<{
      route?: {
        path: string;
        methods: { [method: string]: boolean };
      };
      handle: RequestHandler;
    }>;
  };

  const availableRoutes: { method: string; path: string }[] = [];

  router.stack.forEach((layer) => {
    if (layer.route) {
      const path = layer.route.path;
      const methods = layer.route.methods;
      for (const method in methods) {
        if (methods[method]) {
          availableRoutes.push({ method: method.toUpperCase(), path });
        }
      }
    }
  });

  console.log('🚀 Available Routes:');
  console.table(availableRoutes);
}

bootstrap().catch((err) => {
  console.error('❌ Error starting server:', err);
});
