import { AppService } from './app.service';
export declare class AppController {
    private readonly service;
    constructor(service: AppService);
    getHero(name: string): Promise<object>;
}
