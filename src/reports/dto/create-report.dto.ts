import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator'

export class CreateReportDto {
  @IsString()
  make: string

  @IsString()
  model: string

  @IsNumber()
  @Min(1900)
  @Max(2030)
  year: string

  @IsNumber()
  @Min(0)
  @Max(999999)
  mileage: number

  @IsLongitude()
  lng: number

  @IsLatitude()
  lat: number

  @IsNumber()
  @Min(0)
  @Max(999999)
  price: number
}
