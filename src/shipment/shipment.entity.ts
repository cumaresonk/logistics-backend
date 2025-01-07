import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from '../driver/driver.entity'; // Import Driver entity
import { Customer } from '../customer/customer.entity'; // Import Customer entity

@ObjectType()
@Entity('shipment') // Explicitly define the table name
export class Shipment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  origin: string;

  @Field()
  @Column()
  destination: string;

  @Field()
  @Column()
  status: string;

  // Many shipments belong to one driver
  @ManyToOne(() => Driver, (driver) => driver.shipments)
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  // Many shipments belong to one customer
  @ManyToOne(() => Customer, (customer) => customer.shipments)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
}
