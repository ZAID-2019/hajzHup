import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {} // Inject UsersService

  @Get()
  async findAll(@Query('limit') limit: number = 5000, @Query('offset') offset: number = 0) {
    return this._usersService.findAll(limit, offset);
  }

  @Post()
  async create(@Body() data:unknown) {
    return this._usersService.create(data);
  }
}
