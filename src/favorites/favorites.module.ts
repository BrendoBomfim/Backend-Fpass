import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { MarvelApiService } from './../marvel-api/marvel-api.service';
import { MarvelApiController } from '../marvel-api/marvel-api.controller'; 
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    CacheModule.register(),
    HttpModule,
  ],
  providers: [FavoritesService, MarvelApiService],
  controllers: [FavoritesController, MarvelApiController],
})
export class FavoritesModule {}
