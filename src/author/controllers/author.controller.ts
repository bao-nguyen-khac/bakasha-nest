import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create.dto';
import { AuthorService } from '../services/author.service';
import { UpdateAuthorDto } from '../dto/update.dto';

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

  @UsePipes(ValidationPipe)
  @Put()
  async updateOne(@Body() updateAuthorDto: UpdateAuthorDto) {
    const result = await this.authorService.updateOne(updateAuthorDto);
    if (result.affected === 1) {
      return {
        suscessful: true,
      };
    }
    return {
      suscessful: false,
    };
  }

  @Delete(':authorId')
  async deleteOne(@Param('authorId', ParseIntPipe) id: number) {
    const result = await this.authorService.deleteOne(id);
    if (result.affected === 1)
      return {
        suscessful: true,
      };
    return {
      suscessful: false,
    };
  }
}
