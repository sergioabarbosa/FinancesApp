import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant, TenantDocument, TenantData } from './tenant.model'; // Importei os tipos corretos TenantDocument e TenantData

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name)
    private readonly tenantModel: Model<TenantDocument>, // Modificado para usar TenantDocument
  ) {}

  async createTenant(tenantData: TenantData): Promise<Tenant> {
    // Modificado o tipo de tenantData para TenantData
    const createdTenant = new this.tenantModel(tenantData);
    return createdTenant.save();
  }

  async findAllTenants(): Promise<Tenant[]> {
    return this.tenantModel.find().exec();
  }

  async findTenantById(id: string): Promise<Tenant | null> {
    return this.tenantModel.findById(id).exec();
  }

  async updateTenant(
    id: string,
    tenantData: TenantData,
  ): Promise<Tenant | null> {
    // Modificado o tipo de tenantData para TenantData
    return this.tenantModel
      .findByIdAndUpdate(id, tenantData, { new: true })
      .exec();
  }

  async deleteTenant(id: string): Promise<Tenant | null> {
    return this.tenantModel.findByIdAndDelete(id).exec();
  }
}
