/* simple classes that are just used to convert all objects to class-based objects so that validation can be applied to them and this objects floats all over the app */

import { IsString } from 'class-validator';

class CreateMessageDto {
  @IsString()
  content: string;
}

export { CreateMessageDto };
