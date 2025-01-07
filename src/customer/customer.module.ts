import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { Customer } from './customer.entity';
import { ShipmentService } from 'src/shipment/shipment.service';
import { Shipment } from 'src/shipment/shipment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Shipment]), 
  ],
  providers: [CustomerService, CustomerResolver, ShipmentService], 
  exports: [CustomerService],
})
export class CustomerModule {}
