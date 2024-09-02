import { ApiProperty } from '@nestjs/swagger';

export class FilterTaskDto {
  @ApiProperty({ example: 'title', description: 'Task description' })
  title?: string;
  @ApiProperty({ example: 'В работе', description: 'Task status' })
  status?: string;
  @ApiProperty({ example: 1, description: 'Id of user' })
  userId?: number;
  @ApiProperty({ example: 'Task', description: 'Task type' })
  type?: string;
  @ApiProperty({ example: 50, description: 'Task progress' })
  progress?: number;
  // executor: string;
  @ApiProperty({ example: '12.12.2024', description: 'Task deadline' })
  deadline?: Date;
  @ApiProperty({ example: 'Task description', description: 'Task description' })
  description?: string;
}
