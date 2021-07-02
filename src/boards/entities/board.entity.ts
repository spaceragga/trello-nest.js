import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IColumn } from "../interfaces/column.interface"

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 150 })
  title: string = 'Board';

  @Column('json')
  columns!: IColumn[];

  toResponse() {
    const { id, title, columns } = this;
    return { id, title, columns };
  }
}
