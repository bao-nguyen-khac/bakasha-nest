import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dto/create.dto';

@Controller('book')
export class BookController {
  constructor(
    @Inject('BOOK_SERVICE') private readonly bookService: BookService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createBookdto: CreateBookDto) {
    const book = await this.bookService.create(createBookdto);
    return {
      book,
      suscess: true,
    };
  }

  @Get()
  async getAll() {
    const books = await this.bookService.getAll();
    return {
      books,
      suscess: true,
    };
  }
}
