import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('/:name')
  async getHero(@Param('name') name: string): Promise<object> {
    return await this.service.getHero(name);
  }
}
