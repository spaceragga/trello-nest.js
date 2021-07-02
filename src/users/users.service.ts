import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser.toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find({});
    return users.map((user) => user.toResponse());
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error(`Couldn't find a user with id: ${id}`);
    }

    return user.toResponse();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userDB = await this.userRepository.findOne(id);

    if (!userDB) {
      throw new Error(`Couldn't find a user with id: ${id}`);
    }

    await this.userRepository.update(id, updateUserDto);
    const updateUser = await this.userRepository.findOne(id);

    return updateUser.toResponse();
  }

  async remove(id: string) {
    const deleteUser = await this.userRepository.delete(id);

    if (!deleteUser) {
      throw new Error(`Couldn't find a user with id: ${id}`);
    }
  }
}
