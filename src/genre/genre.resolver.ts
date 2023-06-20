import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GenreService } from './genre.service';
import { GenreEntity } from './entities/genre.entity';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';

@Resolver(() => GenreEntity)
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Mutation(() => GenreEntity)
  createGenre(@Args('createGenreInput') createGenreInput: CreateGenreInput) {
    return this.genreService.create(createGenreInput);
  }

  @Query(() => [GenreEntity], { name: 'genres' })
  findAll() {
    return this.genreService.findAll();
  }

  @Query(() => GenreEntity, { name: 'genre' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.genreService.findOne(id);
  }

  @Mutation(() => GenreEntity)
  async updateGenre(
    @Args('updateGenreInput') updateGenreInput: UpdateGenreInput,
  ) {
    return await this.genreService.update(
      updateGenreInput.id,
      updateGenreInput,
    );
  }

  @Mutation(() => GenreEntity)
  removeGenre(@Args('id', { type: () => Int }) id: number) {
    return this.genreService.remove(id);
  }
}
