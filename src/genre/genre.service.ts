import { Injectable } from '@nestjs/common';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity } from './entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}
  async create(createGenreInput: CreateGenreInput) {
    return await this.genreRepository.save(createGenreInput);
  }

  async findAll() {
    return await this.genreRepository.find({
      relations: {
        movies: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.genreRepository.findOne({
      where: { id: id },
      relations: {
        movies: true,
      },
    });
  }

  async update(id: number, updateGenreInput: UpdateGenreInput) {
    return await this.genreRepository.save(updateGenreInput);
  }

  async remove(id: number) {
    return await this.genreRepository.delete(id);
  }
}
