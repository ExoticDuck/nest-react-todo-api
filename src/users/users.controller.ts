import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { SetRoleDto } from 'src/dto/set-role.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 201,
    type: User,
  })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({
    summary: 'Get user',
  })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  // @Roles('ROLE_ADMIN')
  // @UseGuards(RolesGuard)
  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({
    summary: 'Set role to user',
  })
  @ApiResponse({
    status: 200,
  })
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  setRole(@Body() setRoleDto: SetRoleDto) {
    return this.usersService.addRole(setRoleDto);
  }
}
