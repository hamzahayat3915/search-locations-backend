// src/measurements/measurements.service.ts
import { Injectable , ConflictException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Measurement, MeasurementDocument } from './measurement.schema';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectModel(Measurement.name) private measurementModel: Model<MeasurementDocument>,
  ) {}
  async findByAddress(address: string): Promise<Measurement | null> {
    return this.measurementModel.findOne({ address }).exec();
  }
  async create(measurementData: Partial<Measurement>): Promise<Measurement> {
    try {
      const existingMeasurement = await this.measurementModel.findOne({
        placeId: measurementData.placeId,
      });
      if (existingMeasurement) {
        throw new ConflictException('Measurement already exists');
      }
      const createdMeasurement = new this.measurementModel(measurementData);
      return createdMeasurement.save();
    } catch (error) {
      console.error('Error creating measurement:', error);
      throw error;
    }
  }
  

  async findAll(): Promise<Measurement[]> {
    return this.measurementModel.find().exec();
  }
}
