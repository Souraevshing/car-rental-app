import { Expose, Transform } from 'class-transformer'
import { User } from '../../users/user.entity'

export class ReportDto {
  @Expose()
  id: number

  @Expose()
  price: number

  @Expose()
  year: number

  @Expose()
  lng: number

  @Expose()
  lat: number

  @Expose()
  make: string

  @Expose()
  model: string

  @Expose()
  mileage: number

  @Expose()
  approved: boolean

  /** Transform decorator will see inside the user.
   * entity and assign id of user using obj property
   * to   userId property and expose the same to
   * http-client
   * */
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number
}
