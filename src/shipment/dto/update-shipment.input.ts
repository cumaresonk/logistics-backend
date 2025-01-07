import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateShipmentInput } from './create-shipment.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateShipmentInput extends PartialType(CreateShipmentInput) {
  @Field()
  @IsUUID()
  id: string; // Ensures the ID is validated during updates
}
