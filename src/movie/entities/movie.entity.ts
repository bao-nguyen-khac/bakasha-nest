import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenreEntity } from 'src/genre/entities/genre.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
@ObjectType()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  genreId: number;

  @ManyToOne(() => GenreEntity, (genre) => genre.movies)
  @Field(() => GenreEntity)
  genre: GenreEntity;
}
