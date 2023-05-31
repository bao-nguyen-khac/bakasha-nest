import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../dto/create.dto';
import { AuthorService } from 'src/author/services/author.service';
import { UpdateBookDto } from '../dto/update.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @Inject('AUTHOR_SERVICE') private readonly authorService: AuthorService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const author = await this.authorService.findById(createBookDto.authorId);
    const bookEntity = new BookEntity();
    bookEntity.author = author;
    bookEntity.description = createBookDto.description;
    bookEntity.name = createBookDto.name;
    const book = await this.bookRepository.save(bookEntity);
    return book;
  }

  async getAll() {
    const books = this.bookRepository.find({
      relations: {
        author: true,
      },
    });
    return books;
  }

  async updateOne(updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOneBy({
      id: updateBookDto.id,
    });

    if (updateBookDto.authorId) {
      const author = await this.authorService.findById(updateBookDto.authorId);
      book.author = author;
    }

    const update = { ...book, ...updateBookDto };

    return await this.bookRepository.save(update);
  }

  async deleteOne(id: number) {
    return await this.bookRepository.delete(id);
  }
}
