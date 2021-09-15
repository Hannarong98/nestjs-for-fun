import { Controller, Get, Redirect } from '@nestjs/common';

@Controller('/')
export class AppController {
  constructor() {}

  @Get()
  @Redirect('http://localhost:3000/api/v1/documentations')
  public redirectToDocumentation(): Promise<void> {
    return;
  }
}
