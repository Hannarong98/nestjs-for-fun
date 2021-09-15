import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

const { PG_USERNAME, PG_PASSWORD, PG_DATABASE_NAME, PG_PORT } = process.env;

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(PG_PORT),
      username: PG_USERNAME,
      password: PG_PASSWORD,
      database: PG_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
