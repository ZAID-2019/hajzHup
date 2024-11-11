import { Injectable, Logger } from '@nestjs/common';
import { ResponseUtil } from 'src/common/response.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BusinessesService {
  constructor(private readonly _prismaService: PrismaService) {}
  private readonly logger = new Logger(BusinessesService.name); // Initializes logger with the class name

  // Get all businesses with pagination
  async findAll(limit?: number, offset?: number): Promise<unknown> {
    try {
      limit = Number(limit) || 10; // Default limit to 10 if not provided
      offset = Number(offset) || 0; // Default offset to 0 if not provided
      const [businesses, total] = await Promise.all([
        this._prismaService.business.findMany({
          where: { deleted_at: null },
          take: limit,
          skip: offset,
          select: {
            id: true,
            name_ar: true,
            name_en: true,
            image_url: true,
          },
          orderBy: {
            id: 'asc', // Change 'created_at' to your desired field
          },
        }),
        this._prismaService.business.count({
          where: { deleted_at: null },
        }),
      ]);

      this.logger.verbose(`Successfully retrieved ${businesses.length} businesses`);
      return ResponseUtil.success('Find All Businesses', { businesses, total });
    } catch (error) {
      this.logger.error(`Error In Find All Businesses: ${error.message}`, error.stack);
      return ResponseUtil.error('An error occurred while searching for medicines', 'SEARCH_FAILED', error?.message);
    }
  }

  // Create a new business
  async create(data): Promise<unknown> {
    try {
      const createBusiness = await this._prismaService.business.create({
        data: data,
      }); // Create a new business with provided data
      this.logger.verbose('Business created successfully');
      return ResponseUtil.success('Business created successfully', createBusiness);
    } catch (error) {
      return ResponseUtil.error(error.message, 'CREATE_FAILED', error?.message);
    }
  }
}
