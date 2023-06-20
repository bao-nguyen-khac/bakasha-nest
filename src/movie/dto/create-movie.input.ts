import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  genreId: number;
}
