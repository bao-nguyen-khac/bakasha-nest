import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { MovieEntity } from './entities/movie.entity';

@Resolver(() => MovieEntity)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Mutation(() => MovieEntity)
  createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
    return this.movieService.create(createMovieInput);
  }

  @Query(() => [MovieEntity], { name: 'movies' })
  findAll() {
    return this.movieService.findAll();
  }

  @Query(() => MovieEntity, { name: 'movie' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.movieService.findOne(id);
  }

  @Mutation(() => MovieEntity)
  updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.movieService.update(updateMovieInput.id, updateMovieInput);
  }

  @Mutation(() => MovieEntity)
  removeMovie(@Args('id', { type: () => Int }) id: number) {
    return this.movieService.remove(id);
  }
}
