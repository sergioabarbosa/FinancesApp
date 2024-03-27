import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TenantDocument = TenantData & Document;

export interface TenantData {
  name: string;
  domain: string;
  subdomain: string;
}

@Schema()
export class Tenant {
  _id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  domain: string;

  @Prop({ required: true })
  subdomain: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
