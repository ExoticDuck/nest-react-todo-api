import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { Task } from './task.model';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { FilterTaskDto } from 'src/dto/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}
  async createTask(taskDto: CreateTaskDto) {
    const task = await this.taskRepository.create({ ...taskDto });
    return task;
  }
  async getTasks(userId: number) {
    const tasks = await this.taskRepository.findAll({
      where: { userId: userId },
      include: { all: true },
    });
    return tasks;
  }
  async getAllTasks() {
    const tasks = await this.taskRepository.findAll({
      include: { all: true },
    });
    return tasks;
  }
  async deleteTask(taskId: number) {
    const result = await this.taskRepository.destroy({ where: { id: taskId } });
    return result;
  }
  async updateTask(updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(
      { ...updateTaskDto },
      {
        where: {
          id: updateTaskDto.id,
        },
      },
    );
    const newTask = await this.taskRepository.findByPk(updateTaskDto.id);
    return newTask;
  }
  async getFilteredTasks(filterTaskDto: FilterTaskDto) {
    const tasks = await this.taskRepository.findAll({
      where: { ...filterTaskDto },
    });
    return tasks;
  }
}
