import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment.entity';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';
import { DriverService } from '../driver/driver.service';
import { CustomerService } from '../customer/customer.service';
import { Driver } from 'src/driver/driver.entity';
import { Customer } from 'src/customer/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Shipment)
export class ShipmentResolver {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly shipmentService: ShipmentService,
    private readonly driverService: DriverService,
    private readonly customerService: CustomerService,
  ) {}

  @Query(() => [Shipment])
  async getAllShipments(): Promise<Shipment[]> {
    return this.shipmentService.findAll();
  }

  @Mutation(() => Shipment)
  async createShipment(
    @Args('createShipmentInput') createShipmentInput: CreateShipmentInput,
  ): Promise<Shipment> {
    const { driverId, customerId, ...shipmentData } = createShipmentInput;

    // Fetch the related Driver and Customer by their IDs
    const driver = await this.driverRepository.findOne({ where: { id: driverId } });
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });

    if (!driver) {
      throw new Error('Driver not found');
    }

    if (!customer) {
      throw new Error('Customer not found');
    }

    // Create a new shipment instance with the related driver and customer
    const shipment = this.shipmentRepository.create({
      ...shipmentData,
      driver,
      customer,
    });

    return this.shipmentRepository.save(shipment);
  //  return this.shipmentService.create(createShipmentInput);
  }

  @Mutation(() => Shipment)
  async updateShipment(
    @Args('updateShipmentInput') updateShipmentInput: UpdateShipmentInput,
  ): Promise<Shipment> {
    return this.shipmentService.update(updateShipmentInput);
  }

  // Resolve the Driver relationship
  @ResolveField(() => Driver)
  async driver(@Parent() shipment: Shipment): Promise<Driver> {
    console.log("shipment",shipment)
    return this.driverService.findOne(shipment.driver.id); // Assuming driverId exists in Shipment
  }

  // Resolve the Customer relationship  
  @ResolveField(() => Customer)
  async customer(@Parent() shipment: Shipment): Promise<Customer> {
    return this.customerService.findOne(shipment.customer.id); // Assuming customerId exists in Shipment
  }

  @Mutation(() => Boolean)
  async deleteShipment(@Args('id') id: string): Promise<boolean> {
    return this.shipmentService.delete(id); // Calls delete method from service
  }
}
