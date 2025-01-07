import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Shipment } from '../shipment/shipment.entity'; // Import Shipment entity

@ObjectType()
@Entity('customer') // Explicitly define the table name
export class Customer {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  // One customer can have many shipments
  @OneToMany(() => Shipment, (shipment) => shipment.customer)
  shipments: Shipment[];
}
