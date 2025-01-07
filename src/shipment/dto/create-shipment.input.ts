import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateShipmentInput {
  @Field()
  origin: string;

  @Field()
  destination: string;

  @Field()
  status: string;

  @Field()
  driverId: string;

  @Field()
  customerId: string;
}
