"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const crypto = require("crypto");
const MARVEL_API_URL = "https://gateway.marvel.com/v1/public";
const MARVEL_API_METHOD = "characters";
let AppService = exports.AppService = class AppService {
    constructor(httpService, cacheService) {
        this.httpService = httpService;
        this.cacheService = cacheService;
    }
    async getHero(name) {
        const cachedData = await this.cacheService.get(name);
        if (cachedData) {
            return { responseData: cachedData };
        }
        let limit = 10;
        let offset = 0;
        var { ts, publicKey, hash } = generateHash();
        const { data } = await this.httpService.axiosRef.get(`${MARVEL_API_URL}/${MARVEL_API_METHOD}?nameStartsWith=${name}&limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        const responseData = {
            data: Object.assign(Object.assign({}, data.data), { results: data.data.results.map((result) => {
                    const { id, name, description, modified } = result;
                    return { id, name, description, modified };
                }) }),
        };
        await this.cacheService.set(name, responseData);
        return { responseData };
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object])
], AppService);
function generateHash() {
    let publicKey = process.env.MARVEL_PUBLICKEY;
    let privateKey = process.env.MARVEL_PRIVATEKEY;
    let ts = Date.now();
    var hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex').toString();
    return { ts, publicKey, hash };
}
//# sourceMappingURL=app.service.js.map