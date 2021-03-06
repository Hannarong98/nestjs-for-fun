## Learning NestJS in free time

Wow it looks like Spring and Angular, pretty cool :smiley:

### Course

- [NestJS Zero to Hero](https://www.udemy.com/course/nestjs-zero-to-hero/)

### Topic

- Task management

### Requirements

- Docker with postgres running in container
- [Optional] pgAdmin for dev purposes
- Postman or any api testing tools

### Setup

- Run `docker run --name <ANY_NAME> -p 5432:5423 -e POSTGRES_PASSWORD=<ANY_PASSWORD> -d postgres`
- Run `yarn install`
- Create `.env` file in root folder and configure environment variables
  - `PORT=<APPLICATION_PORT>`
  - `ENVIRONMENT=<YOUR_ENVIRONMENT>`
  - `PG_USERNAME=<POSTGRES_USERNAME>`
  - `PG_PASSWORD=<POSTGRES_PASSWORD>`
  - `PG_DATABASE_NAME=<DATABASE_NAME>`
  - `PG_PORT=<POSTGRES_PORT>`
  - `JWT_SECRET=<JWT_SECRET/STRING_VALUES>`
  - `TOKEN_EXPIRES_IN=<TOKEN_EXPIRATION_TIME_IN_SECONDS>`
- Run `yarn start`

### Swagger endpoint

- `<baseurl>/api/v1/documentations`

### Techs

- [nestjs](https://github.com/nestjs/nest)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)
- [morgan](https://github.com/expressjs/morgan)
- [docker](https://www.docker.com/)
- [postgres](https://www.postgresql.org/)
- [pgadmin](https://www.pgadmin.org/)
- [typeorm](https://github.com/typeorm/typeorm)
- [passport](https://github.com/jaredhanson/passport)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- [swagger](https://swagger.io/)
