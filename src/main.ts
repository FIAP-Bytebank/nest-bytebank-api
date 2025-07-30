import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Iniciando aplicação NestJS...');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://fiap-bytebank.vercel.app',
      'https://fiap-bytebank-auth.vercel.app/',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(` App rodando na porta ${process.env.PORT ?? 3000}`);
}

bootstrap().catch((err) => {
  console.error('Erro fatal ao iniciar o NestJS:', err);
  process.exit(1);
});
