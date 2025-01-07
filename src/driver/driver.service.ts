import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) { }

  findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  async findOne(id: string): Promise<Driver> {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }
    return driver;
  }

  create(createDriverInput: CreateDriverInput): Promise<Driver> {
    const driver = this.driverRepository.create(createDriverInput);
    return this.driverRepository.save(driver);
  }

  async update(updateDriverInput: UpdateDriverInput): Promise<Driver> {
    const driver = await this.findOne(updateDriverInput.id);
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${updateDriverInput.id} not found`);
    }

    Object.assign(driver, updateDriverInput);
    return this.driverRepository.save(driver);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.driverRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return true;
  }
}
