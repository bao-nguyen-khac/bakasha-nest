import { AuthorEntity } from 'src/author/entities/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'book' })
export class BookEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;
}
