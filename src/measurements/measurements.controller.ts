// src/measurements/measurements.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { Measurement } from './measurement.schema';
import { Client, PlaceAutocompleteRequest, PlaceAutocompleteResponse } from '@googlemaps/google-maps-services-js';
@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) { }


  @Post('geocode')
  async getGeocode(@Body('address') address: string) {
    try {

      const existingMeasurement = await this.measurementsService.findByAddress(address);
      if (existingMeasurement) {
        return {
          lat: existingMeasurement.mapCenter.lat,
          lng: existingMeasurement.mapCenter.lng,
          placeId: existingMeasurement.placeId,
          address: existingMeasurement.address,
        };
      } else {


        const client = new Client({});
        const response = await client.placeAutocomplete({
          params: {
            input: address,
            key: 'AIzaSyDsRy4pRqshdrNkq4LxQq2nPeXMjHRbxkI',
          },
        });

        if (response.data.predictions.length > 0) {
          const placeId = response.data.predictions[0].place_id;
          const placeDetails = await client.placeDetails({
            params: {
              place_id: placeId,
              key: 'AIzaSyDsRy4pRqshdrNkq4LxQq2nPeXMjHRbxkI',
            },
          });

          const { lat, lng } = placeDetails.data.result.geometry.location;
          const formattedAddress = placeDetails.data.result.formatted_address;

          return {
            lat,
            lng,
            placeId,
            address: formattedAddress,
          };
        }

      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  @Post()
  async create(@Body() measurementData: Partial<Measurement>) {
    return this.measurementsService.create(measurementData);
  }

  @Get()
  async findAll() {
    return this.measurementsService.findAll();
  }
}
