import { Board } from '../../boards/entities/board.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 150 })
  title: string = 'Task';

  @Column('integer')
  order: number = 0;

  @Column('varchar', { length: 500 })
  description = 'Description';

  @Column('text', { nullable: true })
  columnId: string | null;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  userId: string | null = null;

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  boardId: string | null = null;

  toResponse() {
    const { id, title, order, description, userId, boardId, columnId } = this;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
