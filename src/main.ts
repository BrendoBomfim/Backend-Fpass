import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Configuração do Swagger
   const config = new DocumentBuilder()
   .setTitle('Marvel Heroes API')
   .setDescription('API para pesquisa e lista de heróis da Marvel')
   .setVersion('1.0')
   .addTag('marvel-api')
   .addTag('favorites')
   .addTag('hello')
   .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);

 await app.listen(process.env.PORT || 3000);
}
bootstrap();
