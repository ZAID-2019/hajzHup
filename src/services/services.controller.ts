import { ServicesService } from './services.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('services')
export class ServicesController {
  constructor(private readonly _servicesService: ServicesService) {} // Inject UsersService

  @Get()
  async findAll(@Query('limit') limit: number = 10, @Query('offset') offset: number = 0) {
    return this._servicesService.findAll(limit, offset);
  }

  @Get(':business_id')
  async findAllByBusinessId(
    @Param('business_id') business_id: number,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this._servicesService.findAllByBusinessId(business_id, limit, offset);
  }

  @Post()
  async create(@Body() data: unknown) {
    return this._servicesService.create(data);
  }
}
