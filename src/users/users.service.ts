import { Injectable, Logger } from '@nestjs/common';
import { ResponseUtil } from 'src/common/response.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly _prismaService: PrismaService) {}
  private readonly logger = new Logger(UsersService.name); // Initializes logger with the class name

  // Get all users with pagination
  async findAll(limit?: number, offset?: number): Promise<unknown> {
    try {
      limit = Number(limit) || 2000; // Default limit to 10 if not provided
      offset = Number(offset) || 0; // Default offset to 0 if not provided
      const [users, total] = await Promise.all([
        this._prismaService.user.findMany({
          where: { deleted_at: null },
          take: limit,
          skip: offset,
          select: {
            id: true,
            email: true,
          },
          orderBy: {
            id: 'desc', // Change 'created_at' to your desired field
          },
        }),
        this._prismaService.user.count({
          where: { deleted_at: null },
        }),
      ]);

      this.logger.verbose(`Successfully retrieved ${users.length} users`);
      return ResponseUtil.success('Find All Users', { users, total });
    } catch (error) {
      this.logger.error(`Error In Find All Users: ${error.message}`, error.stack);
      return ResponseUtil.error('An error occurred while searching for medicines', 'SEARCH_FAILED', error?.message);
    }
  }

  // Create a new user
  async create(data): Promise<unknown> {
    try {
      //? Hash the password (10 is the salt rounds)
      const hashedPassword = await hash(data.password, 10);

      //? Create the user using Prisma
      const createUser = await this._prismaService.user.create({
        data: {
          ...data, // Spread the DTO properties
          password: hashedPassword, // Use the hashed password
        },
      }); // Create a new user with provided data
      this.logger.verbose('User created successfully');
      return ResponseUtil.success('User created successfully', createUser);
    } catch (error) {
      return ResponseUtil.error(error.message, 'CREATE_FAILED', error?.message);
    }
  }
}
