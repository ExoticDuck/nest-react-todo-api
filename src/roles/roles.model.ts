import { UserRoles } from './user-roles.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Roles } from 'src/constants';
import { CreateRoleDto } from 'src/dto/create-role.dto';
import { User } from 'src/users/users.model';

@Table({ tableName: 'roles' })
export class Role extends Model<Role, CreateRoleDto> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  // @ApiProperty({ example: Roles.ADMIN, description: 'User role' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;
  // @ApiProperty({
  //   example: 'Description of role',
  //   description: 'Some description',
  // })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
