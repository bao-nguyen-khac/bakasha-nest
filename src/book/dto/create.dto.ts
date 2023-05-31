import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  @IsNumberString()
  authorId: number;
}
