import { Module } from '@nestjs/common';
import { MarvelApiService } from './marvel-api.service';
import { MarvelApiController } from './marvel-api.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
  ],
  controllers: [MarvelApiController],
  providers: [MarvelApiService]
})
export class MarvelApiModule {}
