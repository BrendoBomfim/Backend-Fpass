const redisStore = require("cache-manager-redis-store");
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

const CACHE_EXPIRATION_TIME = 86400;

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: CACHE_EXPIRATION_TIME,
      store: redisStore, 
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME, // new property
      password: process.env.REDIS_PASSWORD, // new property
      no_ready_check: true, // new property
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
