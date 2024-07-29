// src/measurements/measurement.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeasurementDocument = Measurement & Document;

@Schema()
export class Measurement {
  @Prop({ type: Object, required: true })
  mapCenter: { lat: number; lng: number };

  @Prop({ required: true })
  placeId: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: false })
  status: string;
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement);
