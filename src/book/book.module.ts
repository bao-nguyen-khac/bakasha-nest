import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorService } from 'src/author/services/author.service';
import { AuthorEntity } from 'src/author/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  controllers: [BookController],
  providers: [
    {
      provide: 'AUTHOR_SERVICE',
      useClass: AuthorService,
    },
    {
      provide: 'BOOK_SERVICE',
      useClass: BookService,
    },
  ],
})
export class BookModule {}
