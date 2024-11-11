import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaController } from './prisma/prisma.controller';
import { PrismaModule } from './prisma/prisma.module';
import { BusinessesModule } from './businesses/businesses.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [UsersModule, PrismaModule, BusinessesModule, ServicesModule],
  controllers: [AppController, PrismaController],
  providers: [AppService],
})
export class AppModule {}
