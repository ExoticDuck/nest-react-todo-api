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
  @Get('/:userId')
  @UseGuards(TasksGuard)
  getTasks(@Param('userId') userId: number) {
    return this.tasksService.getTasks(userId);
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
