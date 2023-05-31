import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { Repository } from 'typeorm';
import { UpdateAuthorDto } from '../dto/update.dto';

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

  async updateOne(updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepository.update(
      {
        id: updateAuthorDto.id,
      },
      updateAuthorDto,
    );
  }

  async deleteOne(id: number) {
    return await this.authorRepository.delete(id);
  }
}
