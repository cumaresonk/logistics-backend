import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipment.entity';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
  ) { }

  findAll(): Promise<Shipment[]> {
    return this.shipmentRepository.find({ relations: ['driver', 'customer'] }); // Include relations
  }

  async findOne(id: string): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: ['driver', 'customer'],
    });

    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }

    return shipment;
  }

  create(createShipmentInput: CreateShipmentInput): Promise<Shipment> {
    const shipment = this.shipmentRepository.create(createShipmentInput);
    return this.shipmentRepository.save(shipment);
  }

  async update(updateShipmentInput: UpdateShipmentInput): Promise<Shipment> {
    const shipment = await this.findOne(updateShipmentInput.id);
    if (!shipment) {
      throw new NotFoundException(`Driver with ID ${updateShipmentInput.id} not found`);
    }
    Object.assign(shipment, updateShipmentInput);
    return this.shipmentRepository.save(shipment);
  }

  async delete(id: string): Promise<boolean> {
    // Find shipment by ID
    const shipment = await this.shipmentRepository.findOne({ where: { id } });

    if (!shipment) {
      return false; // Shipment not found
    }

    // Delete the shipment
    await this.shipmentRepository.remove(shipment);

    return true; // Successfully deleted
  }

  async findByCustomerId(customerId: string): Promise<Shipment[]> {
    return this.shipmentRepository.find({
      where: { customer: { id: customerId } }, // Use relation condition
      relations: ['driver', 'customer'], // Include relations if necessary
    });
  }

  async findByDriverId(driverId: string): Promise<Shipment[]> {
    return this.shipmentRepository.find({
      where: { driver: { id: driverId } }, // Use relation condition
      relations: ['driver', 'customer'], // Include relations if necessary
    });
  }


}
