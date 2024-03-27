import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchema } from './tenant.model';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller'; // Importe o controlador de tenant

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tenant', schema: TenantSchema }]),
  ],
  controllers: [TenantController], // Adicione o controlador ao módulo
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
