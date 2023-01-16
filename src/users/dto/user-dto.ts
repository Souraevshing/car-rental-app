/**
 * Defining what all data to be sent to the server
 */

import { Expose, Exclude } from 'class-transformer'

export class UserDto {
  @Expose()
  id: number

  @Expose()
  email: string
}
