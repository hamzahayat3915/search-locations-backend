// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementsModule } from './measurements/measurements.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hamza'), // Replace with your MongoDB connection string
    MeasurementsModule,
  ],
})
export class AppModule {}
