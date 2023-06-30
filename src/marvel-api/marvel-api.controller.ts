import { Controller, Param, Get } from '@nestjs/common';
import { MarvelApiService } from './marvel-api.service';

@Controller('marvel-api')
export class MarvelApiController {
  constructor(private readonly marvelApiService: MarvelApiService) {}

  @Get('/findHero/:name')
  async getHero(@Param('name') name: string): Promise<object> {
    return await this.marvelApiService.getHero(name);
  }
}
