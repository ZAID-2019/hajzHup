import { Injectable, Logger } from '@nestjs/common';
import { ResponseUtil } from 'src/common/response.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly _prismaService: PrismaService) {}
  private readonly logger = new Logger(ServicesService.name); // Initializes logger with the class name

  // Get all services with pagination
  async findAll(limit?: number, offset?: number): Promise<unknown> {
    try {
      limit = Number(limit) || 10; // Default limit to 10 if not provided
      offset = Number(offset) || 0; // Default offset to 0 if not provided
      const [services, total] = await Promise.all([
        this._prismaService.service.findMany({
          where: { deleted_at: null },
          take: limit,
          skip: offset,
          select: {
            id: true,
            name_ar: true,
            name_en: true,
            description_ar: true,
            description_en: true,
            image_url: true,
          },
          orderBy: {
            id: 'desc', // Change 'created_at' to your desired field
          },
        }),
        this._prismaService.service.count({
          where: { deleted_at: null },
        }),
      ]);

      this.logger.verbose(`Successfully retrieved ${services.length} services`);
      return ResponseUtil.success('Find All Services', { services, total });
    } catch (error) {
      this.logger.error(`Error In Find All Services: ${error.message}`, error.stack);
      return ResponseUtil.error('An error occurred while searching for medicines', 'SEARCH_FAILED', error?.message);
    }
  }

  // Get all services with pagination
  async findAllByBusinessId(business_id:number, limit?: number, offset?: number): Promise<unknown> {
    try {
      limit = Number(limit) || 10; // Default limit to 10 if not provided
      offset = Number(offset) || 0; // Default offset to 0 if not provided
      const [services, total] = await Promise.all([
        this._prismaService.service.findMany({
          where: { deleted_at: null, business_id: Number(business_id) },
          take: limit,
          skip: offset,
          select: {
            id: true,
            name_ar: true,
            name_en: true,
            description_ar: true,
            description_en: true,
            image_url: true,
            price: true,
            business: {
              select: {
                id: true,
                name_ar: true,
                name_en: true,
                image_url: true,
              },
            },
          },
          orderBy: {
            id: 'desc', // Change 'created_at' to your desired field
          },
        }),
        this._prismaService.service.count({
          where: { deleted_at: null },
        }),
      ]);

      this.logger.verbose(`Successfully retrieved ${services.length} services`);
      return ResponseUtil.success('Find All Services', { services, total });
    } catch (error) {
      this.logger.error(`Error In Find All Services: ${error.message}`, error.stack);
      return ResponseUtil.error('An error occurred while searching for medicines', 'SEARCH_FAILED', error?.message);
    }
  }

  // Create a new service
  async create(data): Promise<unknown> {
    try {
      const createBusiness = await this._prismaService.service.create({
        data: data,
      }); // Create a new service with provided data
      this.logger.verbose('Service created successfully');
      return ResponseUtil.success('Service created successfully', createBusiness);
    } catch (error) {
      return ResponseUtil.error(error.message, 'CREATE_FAILED', error?.message);
    }
  }
}
