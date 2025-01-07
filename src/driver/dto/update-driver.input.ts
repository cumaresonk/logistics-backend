import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateDriverInput } from './create-driver.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  @Field()
  @IsUUID()
  id: string; // Validates the ID field during updates
}
