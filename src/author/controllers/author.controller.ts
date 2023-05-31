import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create.dto';
import { AuthorService } from '../services/author.service';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @UsePipes(ValidationPipe)
  @Post('')
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    const author = await this.authorService.createAuthor(createAuthorDto);
    return {
      author,
      successs: true,
    };
  }

  @Get('')
  async getAll() {
    const authors = await this.authorService.getAll();
    return authors;
  }
}
