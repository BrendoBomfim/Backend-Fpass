import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
export declare class AppService {
    private readonly httpService;
    private cacheService;
    constructor(httpService: HttpService, cacheService: Cache);
    getHero(name: string): Promise<object>;
}
