import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
    return `Este é um projeto de API REST que permite pesquisar, favoritar e listar heróis da Marvel. Para mais informações, você pode acessar ${baseUrl}/api`;
  }
}
