import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { Roles } from 'src/constants';

export class CreateUserDto {
  @ApiProperty({ example: 'example@mail.com', description: 'User email' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;
  @ApiProperty({ example: '1234', description: 'Password' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, {
    message: 'Пароль должен быть не менее 4 и не более 16 символов в длину',
  })
  password: string;
}
