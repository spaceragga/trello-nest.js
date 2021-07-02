import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private userRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const newBoard = await this.userRepository.create(createBoardDto);
    await this.userRepository.save(newBoard);
    return newBoard.toResponse();
  }

  async findAll() {
    const boards = await this.userRepository.find({});
    return boards.map((board) => board.toResponse());
  }

  async findOne(id: string) {
    const board = await this.userRepository.findOne(id);

    if (!board) {
      throw new Error(`Couldn't find a user with id: ${id}`);
    }

    return board.toResponse();
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.userRepository.findOne(id);
    if (!board) {
      throw new Error(`Couldn't find a user with id: ${id}`);
    }
    const updatedBoard = await this.userRepository.save({
      ...board,
      ...updateBoardDto,
      id,
    });
    return updatedBoard;
  }

  async remove(id: string) {
    const deleteBoard = await this.userRepository.delete(id);

    if (!deleteBoard) {
      throw new Error(`Couldn't find a user with id: ${id}`);
    }
  }
}
