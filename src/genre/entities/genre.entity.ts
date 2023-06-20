import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'genre' })
@ObjectType()
export class GenreEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => MovieEntity, (movie) => movie.genre)
  @Field(() => [MovieEntity], { nullable: true })
  movies?: MovieEntity[];
}
