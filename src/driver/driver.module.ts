import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverService } from './driver.service';
import { DriverResolver } from './driver.resolver';
import { Driver } from './driver.entity';
import { ShipmentService } from 'src/shipment/shipment.service';
import { Shipment } from 'src/shipment/shipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver,Shipment])],
  providers: [DriverService, DriverResolver,ShipmentService],
  exports: [DriverService],
})
export class DriverModule {}
