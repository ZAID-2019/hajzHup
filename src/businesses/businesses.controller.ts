import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BusinessesService } from './businesses.service';

@Controller('businesses')
export class BusinessesController {

    constructor(private readonly _businessesService: BusinessesService) {} // Inject UsersService

    @Get()
    async findAll(@Query('limit') limit: number = 10, @Query('offset') offset: number = 0) {
      return this._businessesService.findAll(limit, offset);
    }
  
    @Post()
    async create(@Body() data:unknown) {
      return this._businessesService.create(data);
    }

}
