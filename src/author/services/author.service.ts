import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async createAuthor(createAuthorDto: CreateAuthorDto) {
    const author = await this.authorRepository.save(createAuthorDto);
    return author;
  }

  async getAll() {
    const authors = await this.authorRepository.find({
      relations: {
        books: true,
      },
    });
    return authors;
  }

  async findById(authorId: number) {
    return await this.authorRepository.findOne({
      where: {
        id: authorId,
      },
    });
  }
}
