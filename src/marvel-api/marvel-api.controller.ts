import { Controller, Param, Get } from '@nestjs/common';
import { MarvelApiService } from './marvel-api.service';
import { ApiTags, ApiOperation  } from '@nestjs/swagger';

@ApiTags('marvel-api')
@Controller('marvel-api')
export class MarvelApiController {
  constructor(private readonly marvelApiService: MarvelApiService) {}

  @ApiOperation({ summary: 'Pesquisa heróis pelo nome' })
  @Get('/findHero/:name')
  async getHero(@Param('name') name: string): Promise<object> {
    return await this.marvelApiService.getHero(name);
  }
}
