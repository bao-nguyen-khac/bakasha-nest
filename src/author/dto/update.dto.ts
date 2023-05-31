import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateAuthorDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}
