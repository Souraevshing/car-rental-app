/**
 * Serialization is done to convert class based object to plain object or json object
 * So that we can restrict any kind of data to be sent to the server
 *
 */
import {
  UseInterceptors,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass, plainToInstance } from 'class-transformer'

interface ClassConstructor {
  new (...args: any[]): {}
}

//simple fn so that it can be used throughout
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  /** runs something before request is handled */

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      /** runs after request is handled */
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        })
      })
    )
  }
}
