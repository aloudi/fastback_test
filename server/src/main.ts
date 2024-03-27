import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get('node_env');
  const origins = [configService.get('front_host')];
  const port = configService.get('port');
  const apiPrefix = configService.get('api_prefix');

  // Setting up listening settings
  app.setGlobalPrefix(apiPrefix);

  if (nodeEnv !== 'production') {
    origins.push('http://localhost:3000');
  }

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  // Setting up validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
    }),
  );

  // Setting up docs
  const config = new DocumentBuilder()
    .setTitle('FastBack_API')
    .setDescription('FastBack_API')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
}

bootstrap();
