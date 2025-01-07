import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { DriverService } from './driver.service';
import { ShipmentService } from '../shipment/shipment.service'; // Import ShipmentService
import { Driver } from './driver.entity';
import { Shipment } from '../shipment/shipment.entity';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';

@Resolver(() => Driver)
export class DriverResolver {
  constructor(
    private readonly driverService: DriverService,
    private readonly shipmentService: ShipmentService, // Inject ShipmentService
  ) {}

  @Mutation(() => Driver)
  createDriver(@Args('createDriverInput') createDriverInput: CreateDriverInput): Promise<Driver> {
    return this.driverService.create(createDriverInput);
  }

  @Query(() => [Driver], { name: 'drivers' })
  findAll(): Promise<Driver[]> {
    return this.driverService.findAll();
  }

  @Query(() => Driver, { name: 'driver' })
  findOne(@Args('id') id: string): Promise<Driver> {
    return this.driverService.findOne(id);
  }

  @Mutation(() => Driver)
  updateDriver(
    @Args('updateDriverInput') updateDriverInput: UpdateDriverInput,
  ): Promise<Driver> {
    return this.driverService.update(updateDriverInput);
  }

  @Mutation(() => Boolean)
  removeDriver(@Args('id') id: string): Promise<boolean> {
    return this.driverService.delete(id);
  }

  @ResolveField(() => [Shipment], { nullable: true })
  shipments(@Parent() driver: Driver): Promise<Shipment[]> {
    const { id } = driver;
    return this.shipmentService.findByDriverId(id); // Fetch shipments for this driver
  }
}
