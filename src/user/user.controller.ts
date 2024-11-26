import { Controller, Get, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)

export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('findById')
  findById(@Body() data: any) {
    return this.userService.findById(data);
  }

  @Post()
  create(@Body() data: any) {
    return this.userService.create(data);
  }

  @Put()
  update(@Body() data: any) {
    return this.userService.update(data);
  }

  @Delete()
  delete(@Body() data: any) {
    return this.userService.delete(data);
  }
}
