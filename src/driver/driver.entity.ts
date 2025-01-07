import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Shipment } from '../shipment/shipment.entity'; // Import Shipment entity

@ObjectType()
@Entity('driver') // Explicitly define the table name
export class Driver {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  vehicle: string;

  // One driver can have many shipments
  @OneToMany(() => Shipment, (shipment) => shipment.driver)
  shipments: Shipment[];
}
