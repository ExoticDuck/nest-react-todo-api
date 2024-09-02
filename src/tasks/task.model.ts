import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { User } from 'src/users/users.model';

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, CreateTaskDto> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
  @ApiProperty({ example: 'task name', description: 'Name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @ApiProperty({ example: 'В работе', description: 'Status for task' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
  @ApiProperty({ example: '12.12.2024', description: 'Deadline for task' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  deadline: Date;
  @ApiProperty({ example: '50', description: 'Progress for task' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  progress: number;
  @ApiProperty({ example: 'В работе', description: 'Type of task' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;
  @ApiProperty({
    example: 'Подробное описание задачи',
    description: 'Description for task',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
  @BelongsTo(() => User)
  executor: User;
}
