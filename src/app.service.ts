import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Este é um projeto de API REST que permite pesquisar, favoritar e listar heróis da Marvel. Para mais informações você pode acessar http://localhost:3000/api';
  }
}