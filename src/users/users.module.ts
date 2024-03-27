import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenancyModule } from '@needle-innovision/nestjs-tenancy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './entities/user.entity'; // Certifique-se de importar o esquema corretamente

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Use o modelo e esquema de usuário
    TenancyModule.forFeature([{ name: 'User', schema: UserSchema }]), // Configure o TenancyModule para o recurso de usuário
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporte o UsersService, se necessário
})
export class UsersModule {}
