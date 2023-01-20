import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class GetEstimateDto {
  @IsString()
  make: string

  @IsString()
  model: string

  /**
   * Converting or transforming incoming values from number to string since when sending query request from browser
   * then, the browser/db sends every data as string therefore, it throws error. So we have to first convert all values
   * to respective data-type
   */
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1999)
  @Max(2023)
  year: number

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(10000)
  mileage: number

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number
}
