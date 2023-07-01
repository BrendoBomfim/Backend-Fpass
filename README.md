# API REST de Busca de Heróis da Marvel
Este é um projeto de API REST que permite pesquisar, marcar e listar heróis da Marvel. A API foi desenvolvida utilizando o framework NestJS com TypeScript e utiliza um banco de dados em memória SQLite para armazenar os dados dos heróis. Além disso, foi incorporado o Redis para adicionar cache à funcionalidade de busca de heróis, o banco Redis está em um container do Docker.

## Tecnologias Utilizadas
* NestJS: É um framework Node.js para a construção de aplicativos do lado do servidor, que utiliza a arquitetura de Módulos, Controladores e Provedores para tornar a estrutura do código organizada e escalável.
* TypeScript: É uma linguagem de programação que estende o JavaScript, adicionando tipagem estática ao código e recursos modernos, proporcionando maior segurança e produtividade durante o desenvolvimento.
* SQLite: É um banco de dados em memória, amplamente utilizado para aplicações de pequeno porte ou para fins de desenvolvimento, facilitando o armazenamento de dados sem a necessidade de configurar um servidor de banco de dados completo.
* Redis: É um banco de dados em memória de código aberto, conhecido por sua velocidade e eficiência na armazenagem e recuperação de dados, sendo especialmente útil para implementar cache em aplicações.
* Docker: Plataforma de conteinerização que facilita a criação, implantação e execução de aplicativos em ambientes isolados.


## Arquitetura

A estrutura de pastas do projeto é organizada da seguinte forma:

* src: Pasta principal do código-fonte.
  * app.module.ts: Arquivo de configuração principal do NestJS, onde as dependências do aplicativo são definidas.
  * app.controller.ts: Controlador principal que define a rota raiz e manipula as solicitações HTTP.
  * app.service.ts: Serviço principal que fornece a lógica de negócios para a rota raiz.
  * marvel-api: Módulo que gerencia as chamadas de API para API da Marvel.
    * marvel-api.module.ts: Módulo principal da marvel-api que define as dependências.
    * marvel-api.service.ts: Serviço responsável por manipular as operações relacionadas as chamadas da API e formatar  .
    * marvel-api.controller.ts: Controlador que define as rotas relacionadas a API e delega as solicitações para o serviço apropriado.
  * favorites: Módulo relacionado a favoritos.
    * entities: Definição das entidades relacionadas a favoritos, que representam os dados dos heróis favoritos no sistema.
    * favorites.module.ts: Módulo principal de favoritos que define as dependências relacionadas aos favoritos.
    * favorites.service.ts: Serviço responsável por manipular as operações relacionadas a favoritos, implementando a lógica de negócios.
    * favorites.controller.ts: Controlador que define as rotas relacionadas a favoritos e delega as solicitações para o serviço apropriado.
* ormconfig.json: Arquivo de configuração do TypeORM para conexão com o banco de dados SQLite.
* database.sqlite: Banco de dados SQLite onde os dados são armazenados.
* docker-compose.yml: Arquivo do docker compose com informações para criar o banco Redis.
  
A arquitetura geral segue o princípio da inversão de dependência (Dependency Inversion Principle) e o fluxo de controle é invertido em relação à arquitetura tradicional. As camadas internas não dependem das camadas externas, e a comunicação ocorre por meio de interfaces ou contratos. Isso permite que as camadas internas sejam independentes de implementações específicas e facilmente substituíveis.

No projeto, a camada mais interna é a de entities, que representa a camada de dados e encapsulam a lógica de acesso ao banco de dados SQLite. Em seguida, temos as camadas de service, que contêm a lógica de negócios relacionada a heróis favoritos.

A camada de controller é responsável por receber as solicitações HTTP, extrair os parâmetros e dados relevantes e, em seguida, delegar as solicitações para os serviços apropriados. O controller retorna as respostas HTTP adequadas com base nas operações realizadas pelos serviços.

Essa arquitetura permite que cada camada seja testada separadamente, pois as dependências externas podem ser facilmente substituídas por mocks ou implementações alternativas durante os testes. Além disso, a modularidade do código facilita a manutenção e a evolução do sistema, pois as mudanças podem ser feitas em uma camada sem afetar as outras.


## Executando o Projeto

O projeto está disponível no [Heroku](https://marvel-heroes-api-6ed174ee6b98.herokuapp.com/api)

Para executar o projeto localmente, siga os passos abaixo:

1. Certifique-se de ter o Node.js, Yarn e o Docker instalados em sua máquina. Você pode baixá-los em [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) e [Docker](https://www.docker.com/products/docker-desktop/) respectivamente.

2. Clone este repositório para o seu ambiente local.

3. Navegue até o diretório raiz do projeto.

4. Instale as dependências do projeto executando o seguinte comando no terminal:

```
yarn install
```

5. Copie o arquivo com as variáveis de ambiente com o seguinte comando:

```
cp .env.example .env
```

6. Modifique o arquivo .env para conter a sua `MARVEL_PUBLICKEY` e `MARVEL_PRIVATEKEY` que pode ser obtida em [Marvel](https://developer.marvel.com/account)

7. Inicie o Docker Compose com o comando
```
docker-compose up
```

8. Inicie o servidor local executando o seguinte comando:

```
yarn start:dev
```
9. A API estará disponível em `http://localhost:3000`.

10. Você pode usar ferramentas como o Postman ou o cURL para testar as rotas da API. Aqui estão alguns exemplos:

* Pesquisar heróis pelo nome:
  
  * Método: GET
  * URL: http://localhost:3000/marvel-api/findHero/Iron
  * Resposta: Array de objetos contendo informações dos heróis encontrados.
  
* Marcar um herói como favorito:

  * Método: POST
  * URL: http://localhost:3000/favorites/123 (onde 123 é o ID do herói na api da Marvel, será encontrado no retorno da pesquisa por nome anterior)
  * Resposta: Uma mensagem dizendo se foi adicionado ou se já havia um herói com esse id salvo.
  
* Desmarcar um herói como favorito:

  * Método: DELETE
  * URL: http://localhost:3000/favorites/123 (onde 123 é o ID do herói na lista de favoritos)
  * Resposta: Uma mensagem dizendo se foi removido com sucesso ou se esse id não existia no banco ou se já havia um herói com esse id salvo.

* Listar todos os heróis marcados como favoritos:

  * Método: GET
  * URL: http://localhost:3000/favorites
  * Resposta: Array de objetos contendo informações dos heróis favoritos.

## Conclusão
Este projeto demonstra a implementação de uma API REST que integra com a API da Marvel para buscar e listar heróis, permitindo a marcação de heróis como favoritos. Utilizando as tecnologias NestJS, TypeScript, SQLite , Redis e Docker foi possível criar uma arquitetura modular e escalável, separando as responsabilidades em diferentes camadas e adicionando cache para otimizar o desempenho da busca de heróis.
