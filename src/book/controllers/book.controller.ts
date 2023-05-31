import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dto/create.dto';
import { UpdateBookDto } from '../dto/update.dto';

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

  @UsePipes(ValidationPipe)
  @Patch()
  async updateOne(@Body() updateBookDto: UpdateBookDto) {
    const book = await this.bookService.updateOne(updateBookDto);
    return book;
  }

  @Delete(':bookId')
  async deleteOne(@Param('bookId', ParseIntPipe) id: number) {
    const result = await this.bookService.deleteOne(id);
    if (result.affected === 1)
      return {
        suscessful: true,
      };
    return {
      suscessful: false,
    };
  }
}
