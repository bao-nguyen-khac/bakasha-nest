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

  @Column({ default: null })
  avatar: string;

  @ManyToOne(() => AuthorEntity, (author) => author.books, {
    onDelete: 'CASCADE',
  })
  author: AuthorEntity;
}
