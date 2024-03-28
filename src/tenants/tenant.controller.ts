import { Controller, Get, Param, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant(): Promise<string> {
    // Aqui você chama o serviço para criar um novo tenant
    const createdTenant = await this.tenantService.createTenant({
      name: 'Novo Tenant',
      domain: 'example.com',
      subdomain: 'newtenant',
      users: [],
    });
    return `Novo Tenant criado com ID: ${createdTenant._id}`;
  }

  @Get(':id')
  async getTenantById(@Param('id') id: string): Promise<string> {
    // Aqui você chama o serviço para obter detalhes específicos do tenant
    const tenant = await this.tenantService.findTenantById(id);
    if (!tenant) {
      return `Nenhum Tenant encontrado com ID: ${id}`;
    }
    return `Detalhes do Tenant: ${JSON.stringify(tenant)}`;
  }

  @Get()
  async getAllTenants(): Promise<string> {
    // Aqui você chama o serviço para obter todos os tenants
    const tenants = await this.tenantService.findAllTenants();
    return `Todos os Tenants: ${JSON.stringify(tenants)}`;
  }

  @Get(':id/tenants')
  async getTenantUsers(@Param('id') tenantId: string): Promise<string> {
    // Aqui você chama o serviço para obter todos os usuários de um tenant específico pelo tenentId
    const tenant = await this.tenantService.findTenantById(tenantId);
    if (!tenant) {
      return `Nenhum Tenant encontrado com ID: ${tenantId}`;
    }
    return `Usuários do Tenant: ${JSON.stringify(tenant.users)}`;
  }
}
