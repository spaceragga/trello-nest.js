import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const newTask = await this.taskRepository.create({
      ...createTaskDto,
      boardId,
    });
    await this.taskRepository.save(newTask);
    return newTask.toResponse();
  }

  async findAll(boardId: string) {
    const tasks = await this.taskRepository.find({
      where: { boardId },
      loadRelationIds: true,
    });
    return tasks.map((task) => task.toResponse());
  }

  async findOne(id: string, boardId: string) {
    const task = await this.taskRepository.findOne(id, {
      where: { boardId },
      loadRelationIds: true,
    });
    if (!task) {
      throw new Error(`Couldn't find a user with id: ${id}`);
    }

    return task.toResponse();
  }

  async update(id: string, boardId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne(id, {
      where: { boardId },
    });

    if (!task) {
      throw new Error(`Couldn't find a task with id: ${id}`);
    }

    const updateTask = await this.taskRepository.save({
      ...task,
      ...updateTaskDto,
    });
    return updateTask;
  }

  async remove(id: string, boardId: string) {
    const deleteBoard = await this.taskRepository.delete({ boardId, id });

    if (!deleteBoard) {
      throw new Error(`Couldn't find a user with id: ${id}`);
    }
  }
}
