import { INestApplication, Logger } from '@nestjs/common';
import morgan from 'morgan';

// Taken from
// https://stackoverflow.com/a/65406470
export const useRequestLogging = (app: INestApplication) => {
  const logger: Logger = new Logger('Request');

  app.use(
    morgan('tiny', {
      stream: {
        write: (message: string) => logger.log(message.replace('\n', '')),
      },
    }),
  );
};
