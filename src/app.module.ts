import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLoggingMiddleware } from './logger/request-logging.middleware';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import {
  TenancyModule,
  TenancyModuleAsyncOptions,
  TenancyModuleOptions,
} from '@needle-innovision/nestjs-tenancy'; // Importe os tipos corretos

import { selectDatabaseConnection } from './tenants/database.connection';
import * as dotenv from 'dotenv';
import { TenantModule } from './tenants/tenant.module';

dotenv.config();

@Module({
  imports: [
    TenantModule,
    UsersModule,
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    TenancyModule.forRootAsync({
      useFactory: async (): Promise<TenancyModuleOptions> => {
        const uri = process.env.DB_URL; // Obtenha a URI do banco de dados do arquivo .env
        const providers = []; // Se necessário, adicione provedores adicionais aqui
        const connectionResolver = async (uri: string) => {
          const tenantId = uri; // Obtenha o ID do inquilino da URI do banco de dados
          const databaseUri = await selectDatabaseConnection(tenantId); // Aguarde a resolução da conexão do banco de dados
          return databaseUri; // Retorne a conexão do banco de dados com base no ID do inquilino
        };
        return { uri: () => uri, providers, connectionResolver }; // Retorne as opções do módulo de inquilinos
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
