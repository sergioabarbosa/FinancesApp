import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Defina uma interface para representar os dados do usuário
export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  tenantId: string; // Apenas uma vez aqui para evitar conflitos
}

export type UserDocument = UserData & Document;

// Defina um esquema para o modelo de usuário
@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  tenantId: string; // Apenas uma vez aqui para evitar conflitos
}

export const UserSchema = SchemaFactory.createForClass(User);
