import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCustomerInput } from './create-customer.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @Field()
  @IsUUID()
  id: string; // Ensures the ID is included and valid for updates
}
