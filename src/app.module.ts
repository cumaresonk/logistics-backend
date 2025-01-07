
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Customer } from './customer/customer.entity';
import { Shipment } from './shipment/shipment.entity';
import { Driver } from './driver/driver.entity';
import { CustomerModule } from './customer/customer.module';
import { ShipmentModule } from './shipment/shipment.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [  // GraphQL setup
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,  // New required driver option for NestJS GraphQL v10
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),  // Auto-generate schema
      playground: true,  // Enable GraphQL Playground for testing
    }),

    // TypeORM setup for MSSQL
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',  // MSSQL container on localhost
      port: 1433,
      username: 'sa',
      password: 'Str0ngPassword!123',
      database: 'Logistics',  // Ensure this matches your database name
      synchronize: true,  // Auto-sync with the database schema
      entities: [Customer,Shipment,Driver],  // Entity definitions
      options: {
        encrypt: false, // Disable encryption for self-signed certificates
      },
    }),

    // Your Items module
    CustomerModule,
    ShipmentModule,
    DriverModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

