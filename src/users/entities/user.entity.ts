import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 150 })
  name: string = 'USER';

  @Column('varchar', { length: 150 })
  login: string = 'login';

  @Column('varchar', { length: 150 })
  password: string = 'P@55w0rd';

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponse() {
    const { id, name, login } = this;
    return { id, name, login };
  }
}
