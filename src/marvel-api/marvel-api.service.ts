import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';

const MARVEL_API_URL = "https://gateway.marvel.com/v1/public";
const MARVEL_API_METHOD = "characters";

@Injectable()
export class MarvelApiService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    async getHero(name: string): Promise<any> {
        // check if data is in cache:
        const cachedData = await this.cacheService.get<{ name: any }>( name );
        if (cachedData) {
        return {responseData: cachedData};
        }

        let limit = 10;
        let offset = 0;
        var { ts, publicKey, hash } = generateHash();
        
        // if not, call API and set the cache:
        const { data } = await this.httpService.axiosRef.get(
        `${MARVEL_API_URL}/${MARVEL_API_METHOD}?nameStartsWith=${name}&limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        );
        
        // transform the response to a more legible one
        const responseData = {
        data: {
            ...data.data,
            results: data.data.results.map((result: any) => {
            const { id, name, description } = result;
            return { id, name, description };
            }),
        },
        };

        await this.cacheService.set(name, responseData);
        return {responseData};
  }

  async getHeroById(id: number): Promise<any> {
    var { ts, publicKey, hash } = generateHash();
    
    const { data } = await this.httpService.axiosRef.get(
      `${MARVEL_API_URL}/${MARVEL_API_METHOD}/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
    );

    // transform the response to a more legible one
    const responseData = {
      data: {
        hero: data.data.results.map((result: any) => {
          const { id, name, description } = result;
          return { id, name, description };
        }),
      },
    };
  
    return responseData.data.hero[0];
  }

}

function generateHash() {
  let publicKey = process.env.MARVEL_PUBLICKEY;
  let privateKey = process.env.MARVEL_PRIVATEKEY;
  let ts = Date.now();

  var hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex').toString();
  return { ts, publicKey, hash };
}