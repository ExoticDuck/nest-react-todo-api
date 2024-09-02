import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { Task } from './task.model';
import { TasksGuard } from './tasks.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { FilterTaskDto } from 'src/dto/filter-task.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles.model';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @ApiOperation({
    summary: 'Create task',
  })
  @ApiResponse({
    status: 201,
    type: Task,
  })
  @Post()
  createTask(@Body() taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }
  @ApiOperation({
    summary: 'Get tasks by userId',
  })
  @ApiResponse({
    status: 201,
    type: [Task],
  })
  @Get('/:userId')
  @UseGuards(TasksGuard)
  getTasks(@Param('userId') userId: number) {
    return this.tasksService.getTasks(userId);
  }
  @ApiOperation({
    summary: 'Get all tasks (admin)',
  })
  @ApiResponse({
    status: 201,
    type: [Task],
  })
  @Get()
  // @Roles('ROLE_ADMIN')
  @UseGuards(TasksGuard)
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
  @Delete('/:taskId')
  @Roles('ROLE_ADMIN')
  deleteTask(@Param('taskId') taskId: number) {
    return this.tasksService.deleteTask(taskId);
  }
  @Put()
  updateTask(@Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(updateTaskDto);
  }
  @Post('/filter')
  // @Roles('ROLE_ADMIN')
  filterTasks(@Body() filterTaskDto: FilterTaskDto) {
    return this.tasksService.getFilteredTasks(filterTaskDto);
  }
}
