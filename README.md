## Learning NestJS in free time

Wow it looks like Spring, pretty cool :smiley:

### Course

- [NestJS Zero to Hero](https://www.udemy.com/course/nestjs-zero-to-hero/)

### Requirements
* Docker with postgres running
* [Optional] pgAdmin for dev purposes

### Setup
- Run `docker run --name <ANY_NAME> -p 5432:5423 -e POSTGRES_PASSWORD=postgres -d postgres`
- Run `yarn install`
- Create .env file in root folder and configure enviroment variables
  - `PORT=<APPLICATION_PORT>`
  - `PG_USERNAME=<POSTGRESS_USERNAME>`
  - `PG_PASSWORD=<POSTGRESS_PASSWORD>`
  - `PG_DATABASE_NAME=<DATABASE_NAME>`
  - `PG_PORT=<POSTGRESS_PORT>`
  - `JWT_SECRET=<JWT_SECRET/STRING_VALUES>`
  - `TOKEN_EXPIRES_IN=<TOKEN_EXPIRATION_TIME_IN_SECONDS>`
 - Run `yarn start`

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
