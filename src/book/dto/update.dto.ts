import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  name: string;

  description: string;

  authorId: number;
}
