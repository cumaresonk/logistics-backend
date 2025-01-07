import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { ShipmentService } from '../shipment/shipment.service'; // Import ShipmentService
import { Customer } from './customer.entity';
import { Shipment } from '../shipment/shipment.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private readonly customerService: CustomerService,
    private readonly shipmentService: ShipmentService, // Inject ShipmentService
  ) {}

  @Mutation(() => Customer)
  createCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput): Promise<Customer> {
    return this.customerService.create(createCustomerInput);
  }

  @Query(() => [Customer], { name: 'customers' })
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Query(() => Customer, { name: 'customer' })
  findOne(@Args('id') id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Mutation(() => Customer)
  updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.update(updateCustomerInput);
  }

  @Mutation(() => Boolean)
  removeCustomer(@Args('id') id: string): Promise<boolean> {
    return this.customerService.remove(id);
  }

  @ResolveField(() => [Shipment], { nullable: true })
  shipments(@Parent() customer: Customer): Promise<Shipment[]> {
    const { id } = customer;
    return this.shipmentService.findByCustomerId(id); 
  }
}
