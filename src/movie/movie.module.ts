import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { GenreModule } from 'src/genre/genre.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), GenreModule],
  providers: [MovieResolver, MovieService],
})
export class MovieModule {}
