import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentService } from './shipment.service';
import { ShipmentResolver } from './shipment.resolver';
import { Shipment } from './shipment.entity';
import { DriverService } from 'src/driver/driver.service';
import { CustomerService } from 'src/customer/customer.service';
import { Driver } from 'src/driver/driver.entity';
import { Customer } from 'src/customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment,Driver,Customer])],
  providers: [ShipmentService, ShipmentResolver,DriverService,CustomerService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
