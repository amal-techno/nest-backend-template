import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { CLIENT_ORIGIN, CLIENT_PORT } from './config/constant';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );

    app.enableCors({
        credentials: true,
        origin: [
            `${CLIENT_ORIGIN}:${CLIENT_PORT}`,
            new RegExp(`/^http://192.168.1.([1-9]|[1-9]):${CLIENT_PORT}$/`),
        ],
    });

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: process.env.npm_package_version.split('.')[0],
    });

    app.useGlobalPipes(new ValidationPipe());

    app.setGlobalPrefix('api', {
        exclude: [
            { path: 'health', method: RequestMethod.GET },
            { path: 'version', method: RequestMethod.GET },
            { path: '/', method: RequestMethod.GET },
        ],
    });

    const config = new DocumentBuilder()
        .setTitle('NestJs Backend Template')
        .setDescription('NestJs common backend template to create a new project')
        .setVersion(process.env.npm_package_version)
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'Session',
                name: 'Session',
                description: 'Enter Ory session token',
                in: 'header',
            },
            'Authorization', // This name here is important for matching up with @ApiBearerAuth() in your controller!
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    await app.listen(3000, '0.0.0.0');
}
bootstrap();
