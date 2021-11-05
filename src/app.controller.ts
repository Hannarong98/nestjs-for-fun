import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

const { ENVIRONMENT, HOSTNAME, PORT } = process.env;

const isDev = ENVIRONMENT.toLocaleLowerCase() === 'dev' || 'development';

const protocol = isDev ? 'http' : 'https';

const hostname = isDev ? 'localhost' : HOSTNAME;

const baseUrl = isDev ? `${protocol}://${hostname}:${PORT}` : `${protocol}://${hostname}`;

@ApiExcludeController(true)
@Controller('/')
export class AppController {
  constructor() {}

  @Get()
  @Redirect(`${baseUrl}/api/v1/documentations`)
  public redirectToDocumentation(): Promise<void> {
    return;
  }
}
