// src/measurements/measurements.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controller';
import { Measurement, MeasurementSchema } from './measurement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Measurement.name, schema: MeasurementSchema }]),
  ],
  providers: [MeasurementsService],
  controllers: [MeasurementsController],
})
export class MeasurementsModule {}
