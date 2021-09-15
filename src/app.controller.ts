import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

const { ENVIRONMENT, HOSTNAME, PORT } = process.env;

const protocol = ENVIRONMENT.toLocaleLowerCase() === 'development' ? 'http' : 'https';

const hostname = ENVIRONMENT.toLocaleLowerCase() === 'development' ? 'localhost' : HOSTNAME;

const baseUrl =
  ENVIRONMENT.toLocaleLowerCase() === 'development'
    ? `${protocol}://${hostname}:${PORT}`
    : `${protocol}://${hostname}`;

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
