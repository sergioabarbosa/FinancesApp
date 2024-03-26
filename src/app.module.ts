import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLoggingMiddleware } from './logger/request-logging.middleware';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv'; // Importe o pacote dotenv

// Carregue as variáveis de ambiente do arquivo .env
dotenv.config();

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(process.env.DB_URL), // Use a variável de ambiente para a URL do banco de dados
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
