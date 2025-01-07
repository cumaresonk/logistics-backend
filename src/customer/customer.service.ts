import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }
    return customer;
  }

  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerInput);
    return this.customerRepository.save(customer);
  }

  async update(
    updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    const customer = await this.findOne(updateCustomerInput.id);
    Object.assign(customer, updateCustomerInput);
    return this.customerRepository.save(customer);
  }

  async remove(id: string): Promise<boolean> {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
    return true;
  }
}
