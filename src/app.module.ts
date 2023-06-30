const redisStore = require("cache-manager-redis-store");
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from './favorites/favorites.module';
import { MarvelApiModule } from './marvel-api/marvel-api.module';

const CACHE_EXPIRATION_TIME = 86400;

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: CACHE_EXPIRATION_TIME,
      store: redisStore, 
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      no_ready_check: true,
    }),
    TypeOrmModule.forRoot(config),
    FavoritesModule,
    MarvelApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
