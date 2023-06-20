import { Injectable } from '@nestjs/common';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { GenreService } from 'src/genre/genre.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    private readonly genreService: GenreService,
  ) {}
  async create(createMovieInput: CreateMovieInput) {
    console.log(await this.movieRepository.save(createMovieInput));

    return await this.movieRepository.save(createMovieInput);
  }

  async findAll() {
    return await this.movieRepository.find({
      relations: {
        genre: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.movieRepository.find({
      where: { id: id },
    });
  }

  async update(id: number, updateMovieInput: UpdateMovieInput) {
    return await this.movieRepository.save(updateMovieInput);
  }

  async remove(id: number) {
    return await this.movieRepository.delete(id);
  }
}
